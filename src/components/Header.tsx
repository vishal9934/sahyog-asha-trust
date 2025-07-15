"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Newspaper, Images } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const [isMobileNewsDropdownOpen, setIsMobileNewsDropdownOpen] =
    useState(false);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const { language, toggleLanguage, t } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isNewsDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        newsDropdownRef.current &&
        !newsDropdownRef.current.contains(e.target as Node)
      ) {
        setIsNewsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isNewsDropdownOpen]);

  const navigationItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "program", href: "/#program" },
    { key: "team", href: "/#team" },
    { key: "contact", href: "/contact" },
  ];

  const newsDropdownItems = [
    {
      key: "allNews",
      href: "/news",
      icon: Newspaper,
      label: t("allNews"),
    },
    {
      key: "mediaCoverage",
      href: "/media",
      icon: Images,
      label: t("mediaCoverage"),
    },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link href="/">
              <div className="w-28 h-12 md:w-40 md:h-14 relative">
                <Image
                  src="/images/sahyogTrust.jpg"
                  alt="Asha Sahyog Trust Logo"
                  fill
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item: { key: string; href: string }) => (
              <Link key={item.key} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                >
                  {t(item.key)}
                </motion.div>
              </Link>
            ))}

            {/* News & Media Dropdown */}
            <div className="relative" ref={newsDropdownRef}>
              <button
                type="button"
                onClick={() => setIsNewsDropdownOpen((open) => !open)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer select-none focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isNewsDropdownOpen}
              >
                <span>{t("newsEvents")}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isNewsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isNewsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {newsDropdownItems.map(
                    (item: {
                      key: string;
                      href: string;
                      icon: any;
                      label: string;
                    }) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setIsNewsDropdownOpen(false)}
                        >
                          <motion.div
                            whileHover={{ backgroundColor: "#f3f4f6" }}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <IconComponent className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </motion.div>
                        </Link>
                      );
                    }
                  )}
                </motion.div>
              )}
            </div>
          </nav>

          {/* Mobile Language Toggle & Donate Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-xs"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {language === "en" ? "हिंदी" : "English"}
              </span>
            </button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/donate"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-1 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow inline-block"
              >
                {t("donate")}
              </Link>
            </motion.div>
          </div>

          {/* Language Toggle & Donate Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === "en" ? "हिंदी" : "English"}
              </span>
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/donate"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow inline-block"
              >
                {t("donate")}
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item: { key: string; href: string }) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  {t(item.key)}
                </Link>
              ))}

              {/* News & Media in Mobile Menu */}
              <div className="border-t pt-4">
                <button
                  onClick={() =>
                    setIsMobileNewsDropdownOpen(!isMobileNewsDropdownOpen)
                  }
                  className="flex items-center justify-between w-full text-gray-700 font-medium py-2 mb-2"
                >
                  <span>{t("newsEvents")}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileNewsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileNewsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1"
                  >
                    {newsDropdownItems.map(
                      (item: {
                        key: string;
                        href: string;
                        icon: any;
                        label: string;
                      }) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileNewsDropdownOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-3 py-2 pl-4 text-gray-600 hover:text-blue-600">
                              <IconComponent className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {item.label}
                              </span>
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
