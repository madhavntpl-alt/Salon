import { Phone, MapPin, Clock } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-card/30 py-12" role="contentinfo">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-primary/30" alt="New Modern Beauty Salon" />
              <span className="font-display text-lg gold-text">New Modern Beauty Salon</span>
            </div>
            <p className="font-body text-sm text-muted-foreground">Premium women & kids beauty studio. Trusted since 2011.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-base text-foreground mb-3">Contact</h3>
            <a
              href="tel:+919039362327"
              className="flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-primary transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
            >
              <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> +91 9039362327
            </a>
            <address className="not-italic">
              <a
                href="https://maps.app.goo.gl/72Wv1bUKPNLkZ49s5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-muted-foreground font-body text-sm hover:text-primary transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
              >
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" /> 104, 66 Raj Avenue, Limbodi, Indore
              </a>
            </address>
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-base text-foreground mb-3">Hours</h3>
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Clock className="w-4 h-4 text-primary" aria-hidden="true" /> Monday – Saturday: 10 AM – 8 PM
            </div>
            <p className="font-body text-sm text-primary/70 pl-6">Closed on Sundays</p>
          </div>
        </div>
        <div className="border-t border-primary/10 pt-6 text-center">
          <p className="font-body text-xs text-muted-foreground">© {new Date().getFullYear()} New Modern Beauty Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
