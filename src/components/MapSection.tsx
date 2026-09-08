import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const MapSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Find Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold gold-text">Visit Our Salon</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden glow-gold"
        >
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5!2d75.86!3d22.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzAwLjAiTiA3NcKwNTEnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Modern Beauty Salon Location"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="font-body text-sm text-foreground/80">
                104, 66 Raj Avenue, Shri Krishna Avenue, Phase 3, Limbodi, Indore, Madhya Pradesh, India
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/72Wv1bUKPNLkZ49s5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full gold-gradient text-primary-foreground font-body text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" /> Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
