"use client";
import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";

const images = [
  "/images/media.jpg",
  "/images/child.jpg",
  "/images/edu.webp",
  "/images/edu.webp",
];

export default function NewsDetailPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">News Title</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow"
            >
              <Image
                src={src}
                alt={`News image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        <div className="text-lg leading-relaxed text-gray-800">
          <p>
            This is a placeholder for the news description. Here you can add
            detailed information about the news event, including all relevant
            details, context, and any other content you wish to display.
          </p>
        </div>
      </div>
    </Layout>
  );
}
