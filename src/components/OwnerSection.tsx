import { motion } from "framer-motion";
import { Award, Star, Sparkles } from "lucide-react";

const certifications = [
  "Orane International (Beauty & Professional Makeup Training)",
  "Savera's Makeup Academy, Indore",
];

const expertise = [
  "Bridal Makeup Specialist",
  "Hair Styling Expert",
  "Advanced Skin & Beauty Treatments",
  "Women & Kids Grooming Expert",
];

const OwnerSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Meet the Expert</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold gold-text">Ranjana Singh</h2>
            <p className="font-elegant text-lg md:text-xl text-foreground/70 mt-2 italic">Founder & Senior Beauty Expert</p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-8 md:p-10 glow-gold">
            {/* Experience */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <Star className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-body text-sm text-muted-foreground">Experience</p>
                <p className="font-display text-lg text-foreground">Since 2011 — 15+ Years</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <p className="font-body text-sm font-semibold text-primary tracking-wide uppercase">Certified Training</p>
              </div>
              <div className="space-y-2 pl-7">
                {certifications.map((c) => (
                  <p key={c} className="font-body text-sm text-foreground/80">✦ {c}</p>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="font-body text-sm font-semibold text-primary tracking-wide uppercase">Expertise</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                {expertise.map((e) => (
                  <p key={e} className="font-body text-sm text-foreground/80">✦ {e}</p>
                ))}
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6 mt-6">
              <p className="font-elegant text-lg md:text-xl text-center italic text-foreground/70">
                "Certified expertise blended with real salon experience since 2011."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OwnerSection;
