"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchEvents } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";

const CARDS_PER_PAGE = 9;

export default function NewsPage() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: CARDS_PER_PAGE,
    pageCount: 1,
    total: 0,
  });
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function getEvents() {
      setLoading(true);
      try {
        const { events, pagination } = await fetchEvents(page, CARDS_PER_PAGE);
        setEvents(events);
        setPagination(pagination);
      } catch (err: any) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    getEvents();
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Scroll to top when the page first mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Layout>
      {/* Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/media.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 mt-10 md:mt-0">
            {t("allNews")}
          </h1>
        </div>
      </section>
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={topRef} />
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <article
                    key={event.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${event.title}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
                    onClick={() => router.push(`/news/${event.documentId}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        router.push(`/news/${event.documentId}`);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        width={600}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {format(new Date(event.date), "dd/MM/yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              {/* Pagination Controls */}
              {pagination.pageCount > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    variant="outline"
                  >
                    {"<"}
                  </Button>
                  {Array.from({ length: pagination.pageCount }, (_, i) => (
                    <Button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={
                        page === i + 1
                          ? "bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500"
                          : ""
                      }
                      variant={page === i + 1 ? "default" : "outline"}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.pageCount, p + 1))
                    }
                    disabled={page === pagination.pageCount}
                    variant="outline"
                  >
                    {">"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
