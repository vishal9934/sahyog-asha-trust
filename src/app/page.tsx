"use client";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import NewsEvents from "@/components/NewsEvents";
import Team from "@/components/Team";
import TrustGoals from "@/components/TrustGoals";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <NewsEvents />
      <TrustGoals />
      <Team />
      {/* <Contact /> */}
    </Layout>
  );
}
