"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "./ui/button";
import { fetchEvents } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewsEvents() {
  const { t, language } = useLanguage();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function getEvents() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEvents(1, 3);
        if (isMounted) {
          setEvents(data.events); // use only the events array
          setError(null); // Clear any previous errors
        }
      } catch (err: any) {
        console.error("Error loading events:", err);
        if (isMounted) {
          const errorMessage =
            err?.message ||
            "Failed to load events. The service may be waking up. Please try again.";
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  function getImageUrl(url: string) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return process.env.NEXT_PUBLIC_API_URL + url;
  }

  const readMoreLabel = language === "hi" ? "आगे पढ़ें" : t("readMore");

  const handleNavigate = (documentId: string) => {
    router.push(`/news/${documentId}`);
  };

  return (
    <section id="news" className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("newsTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("newsSubtitle")}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-gray-500">Loading events...</p>
              <p className="text-sm text-gray-400">
                This may take a moment if the service is waking up
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <AlertCircle className="w-12 h-12 mb-4" />
            <div className="text-xl font-semibold">No activities found</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            >
              {events
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .slice(0, 3)
                .map((event) => (
                  <motion.article
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => handleNavigate(event.documentId)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${event.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleNavigate(event.documentId);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={getImageUrl(event.image)}
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
                      <p
                        className="text-gray-600 leading-relaxed overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: "10",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {event.description}
                      </p>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate(event.documentId);
                          }}
                        >
                          <span>{readMoreLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </motion.div>
            <Link href="/news">
              <Button className="flex items-center justify-center mx-auto bg-green-500 hover:bg-green-400">
                {t("seeAllActivities")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
