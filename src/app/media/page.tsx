"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Sample media data - replace with actual newspaper clippings
const mediaData = {
  all: [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2025",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2025",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/6647003/pexels-photo-6647003.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/6647112/pexels-photo-6647112.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2023",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/6647264/pexels-photo-6647264.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2023",
    },
  ],
};

export default function MediaPage() {
  const { language } = useLanguage();
  const translations: Record<"en" | "hi", Record<string, string>> = {
    en: {
      mediaHeroTitle: "Media Coverage",
      mediaHeroSubtitle:
        "Our work in the spotlight • Community impact stories • Press coverage",
      pressMediaTitle: "Press & Media",
      pressMediaSubtitle:
        "Explore our journey through newspaper coverage and media highlights showcasing our community impact",
      all: "All",
      noMediaFound: "No Media Found",
      noMediaDesc: "No media coverage available for ",
      of: "of",
    },
    hi: {
      mediaHeroTitle: "मीडिया कवरेज",
      mediaHeroSubtitle:
        "हमारे कार्य की झलक • सामुदायिक प्रभाव की कहानियाँ • प्रेस कवरेज",
      pressMediaTitle: "प्रेस और मीडिया",
      pressMediaSubtitle:
        "समाचार पत्रों की कवरेज और मीडिया हाइलाइट्स के माध्यम से हमारी यात्रा को देखें, जो हमारे सामुदायिक प्रभाव को दर्शाती है।",
      all: "सभी",
      noMediaFound: "कोई मीडिया नहीं मिला",
      noMediaDesc: "के लिए कोई मीडिया कवरेज उपलब्ध नहीं है:",
      of: "में से",
    },
  };
  const t = (key: string) => translations[language][key] || key;
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredMedia, setFilteredMedia] = useState(mediaData.all);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredMedia(mediaData.all);
    } else {
      setFilteredMedia(mediaData.all.filter((item) => item.year === activeTab));
    }
  }, [activeTab]);

  const openLightbox = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredMedia.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredMedia[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredMedia[prevIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentImageIndex, filteredMedia]);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/media.jpg")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-green-900/50" />

          <motion.div
            className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t("mediaHeroTitle")}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t("mediaHeroSubtitle")}
            </motion.p>
          </motion.div>
        </section>

        {/* Media Gallery Section */}
        <section className="py-8 md:py-20 px-4 max-w-7xl mx-auto">
          <motion.div className="text-center mb-8 md:mb-12" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("pressMediaTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("pressMediaSubtitle")}
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div className="mb-8 md:mb-12" {...fadeInUp}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
                >
                  {t("all")}
                </TabsTrigger>
                <TabsTrigger
                  value="2025"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
                >
                  2025
                </TabsTrigger>
                <TabsTrigger
                  value="2024"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
                >
                  2024
                </TabsTrigger>
                <TabsTrigger
                  value="2023"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
                >
                  2023
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-5 md:mt-12">
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  key={activeTab}
                >
                  {filteredMedia.map((item, index) => (
                    <motion.div key={item.id} variants={fadeInUp}>
                      <div
                        className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
                        onClick={() => openLightbox(item, index)}
                      >
                        <div className="relative overflow-hidden aspect-[4/3]">
                          <Image
                            src={item.image}
                            alt={`Media ${item.id}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Eye className="w-6 h-6 text-gray-800" />
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {item.year}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {filteredMedia.length === 0 && (
                  <motion.div className="text-center py-20" {...fadeInUp}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t("noMediaFound")}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {t("noMediaDesc")} {activeTab}. Check back later for
                      updates.
                    </p>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-5xl max-h-[90vh] w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
                  onClick={closeLightbox}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                {/* Image */}
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={selectedImage.image}
                    alt={`Media ${selectedImage.id}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Image Counter */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-sm">
                  {currentImageIndex + 1} {t("of")} {filteredMedia.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
