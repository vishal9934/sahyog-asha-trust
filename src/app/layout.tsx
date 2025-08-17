import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahyog Asha Trust - Empowering Communities, Transforming Lives",
  description:
    "Dedicated to creating positive change through education, skill development, and community empowerment across India.",
  openGraph: {
    title: "Sahyog Asha Trust",
    description: "Empowering Communities, Transforming Lives",
    url: "https://sahyogashatrust.org",
    siteName: "Sahyog Asha Trust",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahyog Asha Trust",
    description: "Empowering Communities, Transforming Lives",
  },
  alternates: {
    canonical: "https://sahyogashatrust.org",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon.png"
          sizes="96x96"
        />
        <meta name="application-name" content="Sahyog Asha Trust" />
        <meta name="apple-mobile-web-app-title" content="Sahyog Asha Trust" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
      {
        "@context": "https://schema.org",
        "@type": "NonProfit",
        "name": "Sahyog Asha Trust",
        "url": "https://sahyogashatrust.org",
        "logo": "https://sahyogashatrust.org/images/sahyogTrust.jpg",
        "description": "Empowering Communities, Transforming Lives",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://sahyogashatrust.org"
        ]
      }
      `,
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
