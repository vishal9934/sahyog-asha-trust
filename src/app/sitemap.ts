import { MetadataRoute } from "next";
import { fetchEvents } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://sahyogashatrust.org";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Dynamic routes - fetch news data
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // Fetch all news events (you might want to adjust the pageSize based on your needs)
    const { events } = await fetchEvents(1, 100); // Fetch up to 100 news items

    dynamicRoutes = events.map((event: any) => ({
      url: `${baseUrl}/news/${event.documentId}`,
      lastModified: new Date(event.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
    // If fetching fails, we still return static routes
  }

  return [...staticRoutes, ...dynamicRoutes];
}
