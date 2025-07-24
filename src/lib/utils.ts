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
        if (
          item.coverImage.formats &&
          item.coverImage.formats.medium &&
          item.coverImage.formats.medium.url
        ) {
          image = `${STRAPI_HOST}${item.coverImage.formats.medium.url}`;
        } else if (item.coverImage.url) {
          image = `${STRAPI_HOST}${item.coverImage.url}`;
        }
      }
      return {
        id: item.id,
        title: item.tittle,
        description: item.discription,
        date: item.createdAt,
        image,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchEvents(page = 1, pageSize = 9) {
  const host = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${host}/api/events?populate=coverImage&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return {
    events: mapEventData(data.data || []),
    pagination: data.meta?.pagination || {
      page: 1,
      pageSize,
      pageCount: 1,
      total: 0,
    },
  };
}
