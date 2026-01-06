"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
