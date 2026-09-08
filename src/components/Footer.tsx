import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-card/30 py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="New Modern Beauty Salon" className="w-10 h-10 rounded-full object-cover border border-primary/30" loading="lazy" />
              <span className="font-display text-lg gold-text">New Modern Beauty Salon</span>
            </div>
            <p className="font-body text-sm text-muted-foreground">Premium women & kids beauty studio. Trusted since 2011.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-base text-foreground mb-3">Contact</h3>
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Phone className="w-4 h-4 text-primary" /> +91 9039362327
            </div>
            <div className="flex items-start gap-2 text-muted-foreground font-body text-sm">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> 104, 66 Raj Avenue, Limbodi, Indore
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-base text-foreground mb-3">Hours</h3>
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Clock className="w-4 h-4 text-primary" /> Monday – Saturday: 10 AM – 8 PM
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
