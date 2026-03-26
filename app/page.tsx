import AIShowcase from "@/components/landing/AIShowcase";
import APISection from "@/components/landing/APISection";
import Automation from "@/components/landing/Automation";
import CommunitySection from "@/components/landing/CommunitySection";
import WhatElseSection from "@/components/landing/WhatElseSection";
import DownloadCTA from "@/components/landing/DownloadCTA";
import ExtensionsGallery from "@/components/landing/ExtensionsGallery";
import FeatureWall from "@/components/landing/FeatureWall";
import FeaturesGallery from "@/components/landing/FeaturesGallery";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturesGallery />
        <FeatureWall />
        <ExtensionsGallery />
        <AIShowcase />
        <Testimonials />
        <Automation />
        <WhatElseSection />
        <CommunitySection />
        <APISection />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
