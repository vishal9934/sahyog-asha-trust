"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useParams } from "next/navigation";
import { fetchEventByDocumentId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

export default function NewsDetailPage() {
  const { id } = useParams(); // `id` = documentId
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getEvent() {
      try {
        console.log("Fetching event for documentId:", id);
        const data = await fetchEventByDocumentId(id as string);
        console.log("Fetched event:", data);

        if (!data) {
          setError("Event not found");
        } else {
          setEvent(data);
        }
      } catch (err) {
        console.error("Error fetching event:", err); // Show exact error
        setError("Failed to load news details");
      } finally {
        setLoading(false);
      }
    }

    if (id) getEvent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6 md:p-8 flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6 md:p-8 text-center text-red-500">
          {error || "News not found."}
        </div>
      </Layout>
    );
  }

  function getImageUrl(url: string) {
    console.log("getImageUrl input:", url);
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      console.log("getImageUrl output (absolute):", url);
      return url;
    }
    const fullUrl = process.env.NEXT_PUBLIC_API_URL + url;
    console.log("getImageUrl output (relative):", fullUrl);
    return fullUrl;
  }

  const coverImage = event.coverImage;
  const gallery = event.galleryImage || [];
  const description = event.discription || "";
  const title = event.tittle || "News Details";

  // Defensive: get cover image URL
  const coverUrl = coverImage?.formats?.medium?.url || coverImage?.url || "";
  console.log("coverImage: ", coverImage);
  console.log("coverUrl: ", coverUrl);
  if (coverImage && coverUrl) {
    console.log("Rendering cover image with URL:", getImageUrl(coverUrl));
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 md:p-8 mt-15">
        <Button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors shadow border border-gray-300"
        >
          ← Back
        </Button>
        <h1 className="text-3xl text-center font-bold mb-6">{title}</h1>
        {coverImage && coverUrl && (
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-3xl aspect-[16/7] rounded-lg overflow-hidden shadow">
              {/* Logging should not be rendered as a React node */}
              <Image
                src={getImageUrl(coverUrl)}
                alt={coverImage.name || "Cover image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        )}
        <div className="text-lg leading-relaxed text-gray-800 pb-5">
          <p>{description}</p>
        </div>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {gallery.map((img: any) => {
              const imgUrl = img?.formats?.medium?.url || img?.url || "";
              console.log("gallery img: ", img);
              console.log("gallery imgUrl: ", imgUrl);
              console.log(
                "Rendering gallery image with URL:",
                getImageUrl(imgUrl)
              );
              return (
                <div
                  key={img.id}
                  className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow"
                >
                  <Image
                    src={getImageUrl(imgUrl)}
                    alt={img.name || "Gallery image"}
                    fill
                    className="fill"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <AlertCircle className="w-12 h-12 mb-4" />
            <div className="text-xl font-semibold">No activities found</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
