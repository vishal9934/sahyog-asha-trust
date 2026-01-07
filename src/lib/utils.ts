import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Strapi host from environment variable
const STRAPI_HOST = process.env.NEXT_PUBLIC_API_URL;

// Map Strapi event data to a flat structure
function mapEventData(strapiData: any[]): any[] {
  return strapiData
    .map((item) => {
      let image = "/images/NoImage.png";
      if (item.coverImage) {
        let url = item.coverImage.formats?.medium?.url || item.coverImage.url;
        if (url) {
          image =
            url.startsWith("http://") || url.startsWith("https://")
              ? url
              : `${STRAPI_HOST}${url}`;
        }
      }
      return {
        id: item.id,
        documentId: item.documentId,
        title: item.tittle,
        description: item.discription,
        date: item.createdAt,
        image,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Retry fetch with exponential backoff for sleeping services (502/503/504)
// Increased retries and delays to handle Render's more aggressive sleeping
async function fetchWithRetry(
  url: string,
  maxRetries = 4, // Increased from 3 to 4
  retryDelay = 3000 // Increased from 2000 to 3000ms
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Much longer timeout for first request (service might be deeply sleeping)
      const timeout = attempt === 0 ? 45000 : attempt === 1 ? 30000 : 15000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      console.log(`Attempt ${attempt + 1}/${maxRetries + 1}: Fetching ${url}`);

      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      // Success - return immediately
      if (res.ok) {
        console.log(`✅ Success on attempt ${attempt + 1}`);
        return res;
      }

      // Handle gateway errors (502, 503, 504) - service is waking up
      if (
        (res.status === 502 || res.status === 503 || res.status === 504) &&
        attempt < maxRetries
      ) {
        const delay = retryDelay * Math.pow(2, attempt);
        console.warn(
          `⚠️ API returned ${
            res.status
          } (service waking up), retrying in ${delay}ms... (attempt ${
            attempt + 1
          }/${maxRetries + 1})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Other errors or out of retries
      const errorText = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${res.statusText}. ${errorText}`);
    } catch (error: any) {
      // Handle timeout/abort errors
      if (error.name === "AbortError" && attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt);
        console.warn(
          `⏱️ Request timeout, retrying in ${delay}ms... (attempt ${
            attempt + 1
          }/${maxRetries + 1})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Network errors - retry
      if (
        (error.message?.includes("fetch") ||
          error.message?.includes("network") ||
          error.message?.includes("Failed to fetch") ||
          error.message?.includes("ERR_")) &&
        attempt < maxRetries
      ) {
        const delay = retryDelay * Math.pow(2, attempt);
        console.warn(
          `🌐 Network error: ${
            error.message
          }, retrying in ${delay}ms... (attempt ${attempt + 1}/${
            maxRetries + 1
          })`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Last attempt or non-retryable error
      if (attempt === maxRetries) {
        console.error(
          `❌ Failed after ${maxRetries + 1} attempts. Last error:`,
          error
        );
        throw new Error(
          `Failed after ${maxRetries + 1} attempts: ${error.message || error}`
        );
      }
      throw error;
    }
  }

  throw new Error("Failed to fetch after all retries");
}

export async function fetchEvents(page = 1, pageSize = 9) {
  const host = process.env.NEXT_PUBLIC_API_URL;

  if (!host) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const url = `${host}/api/events?populate=coverImage&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

  try {
    const res = await fetchWithRetry(url);
    const data = await res.json();

    // Validate response structure
    if (!data || typeof data !== "object") {
      console.error("Invalid API response structure:", data);
      throw new Error("Invalid response format from API");
    }

    return {
      events: mapEventData(data.data || []),
      pagination: data.meta?.pagination || {
        page: 1,
        pageSize,
        pageCount: 1,
        total: 0,
      },
    };
  } catch (error: any) {
    // Log detailed error for debugging
    console.error("fetchEvents error details:", {
      url,
      host,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

export async function fetchEventByDocumentId(documentId: string) {
  const host = process.env.NEXT_PUBLIC_API_URL;

  if (!host) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const url = `${host}/api/events?filters[documentId][$eq]=${documentId}&populate=*`;

  const res = await fetchWithRetry(url);
  const data = await res.json();

  if (!data.data || !data.data.length) return null;
  return data.data[0];
}
