import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OwnerSection from "@/components/OwnerSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import ReviewsSection from "@/components/ReviewsSection";
import MapSection from "@/components/MapSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
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
