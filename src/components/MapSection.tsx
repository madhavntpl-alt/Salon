import { motion } from "framer-motion";
import { MapPin, Navigation, Image } from "lucide-react";

const MapSection = () => {
  const SALON_LAT = 22.7216;
  const SALON_LNG = 75.8577;
  const SALON_ADDRESS = "104, 66 Raj Avenue, Shri Krishna Avenue, Phase 3, Limbodi, Indore, Madhya Pradesh 452010, India";
  const MAP_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5!2d${SALON_LNG}!3d${SALON_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630e8b5c7b1c2f%3A0x7c8b9e8f8c8b8f8c!2s104%2C%2066%20Raj%20Ave%2C%20Shri%20Krishna%20Ave%2C%20Phase%203%2C%20Limbodi%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v${Date.now()}`;
  const MAPS_DIRECTIONS_URL = "https://maps.app.goo.gl/72Wv1bUKPNLkZ49s5";
  const STATIC_MAP_URL = `https://maps.googleapis.com/maps/api/staticmap?center=${SALON_LAT},${SALON_LNG}&zoom=16&size=600x400&maptype=roadmap&markers=color:gold%7Clabel:NMBS%7C${SALON_LAT},${SALON_LNG}&key=YOUR_API_KEY`;

  return (
    <section id="contact" className="py-20 md:py-28 relative" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Find Us</p>
          <h2 id="contact-heading" className="font-display text-3xl md:text-5xl font-bold gold-text">Visit Our Salon</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden glow-gold"
        >
          <div className="aspect-video w-full relative">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", top: 0, left: 0 }}
              allowFullScreen
              loading="lazy"
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
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;