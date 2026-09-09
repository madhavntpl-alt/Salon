import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OwnerSection from "@/components/OwnerSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import ReviewsSection from "@/components/ReviewsSection";
import MapSection from "@/components/MapSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import AmbientGlow from "@/components/AmbientGlow";
import Global3DBackground from "@/components/Global3DBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-foreground">
      <SEO />
      {/* 3D Cosmos flowing across the entire website */}
      <Global3DBackground />
      <AmbientGlow />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <OwnerSection />
        <ServicesSection />
        <ReviewsSection />
        <BookingSection />
        <MapSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
