import { motion } from "framer-motion";
import { MapPin, Navigation, Image } from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";

const MapSection = () => {
  const SALON_ADDRESS = "104, 66 Raj Avenue, Shri Krishna Avenue, Phase 3, Limbodi, Indore, Madhya Pradesh 452010, India";
  const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(SALON_ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const MAPS_DIRECTIONS_URL = "https://maps.app.goo.gl/72Wv1bUKPNLkZ49s5";

  return (
    <section id="contact" className="py-20 md:py-28 relative" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/15 to-transparent pointer-events-none" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.25 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">Find Us</p>
          <h2 id="contact-heading" className="font-display text-3xl md:text-5xl font-bold gold-text">Visit Our Salon</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl mx-auto"
        >
          <Card3DTilt
            maxTilt={3}
            scale={1.008}
            className="rounded-2xl border border-primary/20 bg-card/90 overflow-hidden glow-gold"
          >
          <div className="aspect-video w-full relative">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0, position: "absolute", top: 0, left: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="New Modern Beauty Salon Location - Interactive Map"
              className="w-full h-full"
            />
            <noscript>
              <div className="absolute inset-0 flex items-center justify-center bg-muted p-8">
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center"
                >
                  <Image className="w-12 h-12 mx-auto text-primary/50 mb-4" aria-hidden="true" />
                  <p className="font-body text-muted-foreground mb-2">Enable JavaScript to view interactive map</p>
                  <p className="font-body text-sm text-primary/70">Click to open in Google Maps</p>
                </a>
              </div>
            </noscript>
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <address className="font-body text-sm text-foreground/80 not-italic">
                {SALON_ADDRESS}
              </address>
            </div>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full gold-gradient text-primary-foreground font-body text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              Get Directions
            </a>
          </div>
          </Card3DTilt>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;