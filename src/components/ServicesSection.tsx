import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Scissors, Heart, HandMetal, Baby, Gem, Crown } from "lucide-react";

const categories = [
  {
    title: "Women Beauty Services",
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    services: ["Eyebrow shaping", "Upper lip threading", "Facial threading", "Waxing (all types)", "Bleach (fruit, oxy, detan)", "Cleanup treatments", "Hydra facial", "O3+ facial", "Advanced skin treatments"],
  },
  {
    title: "Hair Services",
    icon: <Scissors className="w-5 h-5 text-primary" />,
    services: ["Haircuts (modern styles)", "Hair styling & designing", "Hair spa & repair", "Keratin treatment", "Nanoplastia", "Botox hair therapy"],
  },
  {
    title: "Bridal & Special Occasion",
    icon: <Crown className="w-5 h-5 text-primary" />,
    services: ["Bridal makeup packages", "Engagement makeup", "Party makeup", "Wedding styling"],
  },
  {
    title: "Body & Wellness",
    icon: <HandMetal className="w-5 h-5 text-primary" />,
    services: ["Manicure & pedicure", "Nail art", "Body polishing", "Back massage"],
  },
  {
    title: "Kids Services",
    icon: <Baby className="w-5 h-5 text-primary" />,
    services: ["Kids haircut", "Gentle grooming services"],
  },
];

const ServicesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-20 md:py-28 relative" aria-labelledby="services-heading">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">What We Offer</p>
          <h2 id="services-heading" className="font-display text-3xl md:text-5xl font-bold gold-text">Our Services</h2>
          <p className="font-elegant text-lg text-muted-foreground mt-3 italic">Women & Kids Only</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-primary/15 bg-card/50 backdrop-blur-sm overflow-hidden glow-gold-hover transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">{cat.icon}</div>
                  <span className="font-display text-lg md:text-xl text-foreground">{cat.title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 md:px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.services.map((s) => (
                        <div key={s} className="flex items-center gap-2 py-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="font-body text-sm text-foreground/80">{s}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
