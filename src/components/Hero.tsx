"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    image: "/images/firsts.jpg",
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
    descriptionKey: "slide1Description",
  },
  {
    id: 2,
    image: "/images/edu.webp",
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
    descriptionKey: "slide2Description",
  },
  {
    id: 3,
    image: "/images/women-workers.png",
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
    descriptionKey: "slide3Description",
  },
  {
    id: 4,
    image: "/images/rural.jpg",
    titleKey: "slide4Title",
    subtitleKey: "slide4Subtitle",
    descriptionKey: "slide4Description",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="home"
      className="relative min-h-[300px] h-[70vh] md:h-[80vh] overflow-hidden pt-16"
    >
      {/* Carousel Container */}
      <div className="relative h-[60vh] md:h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={heroSlides[currentSlide].image}
                alt={t(heroSlides[currentSlide].titleKey)}
                fill
                className="object-fill"
                priority
              />
            </div>

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
                <div className="max-w-4xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 sm:mb-4 drop-shadow-md"
                  >
                    {t(heroSlides[currentSlide].titleKey)}
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-200 font-semibold mb-3 sm:mb-6 drop-shadow"
                  >
                    {t(heroSlides[currentSlide].subtitleKey)}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-4 sm:mb-8 drop-shadow"
                  >
                    {t(heroSlides[currentSlide].descriptionKey)}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    <Link href="/about">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
                      >
                        <span>{t("learnMore")}</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (hidden on mobile) */}
        <button
          onClick={() =>
            goToSlide(
              (currentSlide - 1 + heroSlides.length) % heroSlides.length
            )
          }
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                10,000+
              </div>
              <div className="text-lg text-gray-600">Lives Impacted</div>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-lg text-gray-600">Communities</div>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-lg text-gray-600">Years Impact</div>
            </div>
          </motion.div>
        </div>
      </div> */}
    </section>
  );
}
