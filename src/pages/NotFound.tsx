import { Link } from "react-router-dom";
import { ArrowLeft, Home, CalendarDays } from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <SEO
        title="Page Not Found | New Modern Beauty Salon"
        description="The page you are looking for does not exist. Return to New Modern Beauty Salon Indore."
        noIndex={true}
        noFollow={true}
      />

      <div className="max-w-md w-full rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-md p-8 md:p-10 glow-gold shadow-2xl">
        <div className="mb-6 flex justify-center">
          <Logo
            width={88}
            height={88}
            className="w-20 h-20 rounded-full object-cover border border-primary/40 glow-gold"
            alt="New Modern Beauty Salon Logo"
          />
        </div>

        <span className="font-display text-7xl font-bold gold-text block mb-2">404</span>
        <h1 className="font-display text-2xl font-semibold text-foreground mb-3">Page Not Found</h1>
        <p className="font-body text-sm text-foreground/70 mb-8 leading-relaxed">
          The beauty treatment or page you are looking for has moved or does not exist. Let's get you back to the salon.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full gold-gradient text-primary-foreground font-body font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Return to Home
          </Link>
          <a
            href="/#booking"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-foreground font-body font-medium text-sm hover:bg-primary/10 transition-colors"
          >
            <CalendarDays className="w-4 h-4 text-primary" aria-hidden="true" />
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
