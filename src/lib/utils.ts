import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Strapi host from environment variable
const STRAPI_HOST = process.env.NEXT_PUBLIC_API_URL;

/**
 * Map Strapi event data to flat structure
 */
function mapEventData(strapiData: any[]): any[] {
  return strapiData
    .map((item) => {
      let image = "/images/NoImage.png";

      if (item.coverImage) {
        const url = item.coverImage.formats?.medium?.url || item.coverImage.url;

        if (url) {
          image = url.startsWith("http") ? url : `${STRAPI_HOST}${url}`;
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

/**
 * Retry-safe fetch for Render sleeping services
 * NO AbortController (important)
 */
async function fetchWithRetry(
  url: string,
  maxRetries = 5,
  baseDelay = 4000
): Promise<Response> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🌐 Fetch attempt ${attempt + 1}: ${url}`);

      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log(`✅ Success on attempt ${attempt + 1}`);
        return res;
      }

      // Render cold start gateway errors
      if ([502, 503, 504].includes(res.status) && attempt < maxRetries) {
        const delay = baseDelay * (attempt + 1);
        console.warn(`⚠️ ${res.status} – retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (error: any) {
      lastError = error;

      if (attempt < maxRetries) {
        const delay = baseDelay * (attempt + 1);
        console.warn(
          `🔁 Retry due to error: ${error.message}, waiting ${delay}ms`
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
    }
  }

  console.error("❌ Fetch failed after retries:", lastError);
  throw lastError;
}

/**
 * Fetch paginated events
 */
export async function fetchEvents(page = 1, pageSize = 9) {
  const host = process.env.NEXT_PUBLIC_API_URL;
  if (!host) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const url = `${host}/api/events?populate=coverImage&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

  const res = await fetchWithRetry(url);
  const data = await res.json();

  return {
    events: mapEventData(data?.data || []),
    pagination: data?.meta?.pagination || {
      page,
      pageSize,
      pageCount: 1,
      total: 0,
    },
  };
}

/**
 * Fetch single event by documentId
 */
export async function fetchEventByDocumentId(documentId: string) {
  const host = process.env.NEXT_PUBLIC_API_URL;
  if (!host) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const url = `${host}/api/events?filters[documentId][$eq]=${documentId}&populate=*`;

  const res = await fetchWithRetry(url);
  const data = await res.json();

  return data?.data?.[0] || null;
}
