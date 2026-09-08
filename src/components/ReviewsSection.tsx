import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", rating: 5, text: "Absolutely the best bridal makeup experience! Ranjana ma'am understood exactly what I wanted. Felt like a queen on my wedding day." },
  { name: "Anita Verma", rating: 5, text: "My go-to salon for every occasion. The facials here are premium quality and the ambiance is so relaxing. Highly recommend!" },
  { name: "Sneha Patel", rating: 5, text: "Got keratin done and my hair has never looked better. The team is so professional and caring. Worth every penny!" },
  { name: "Ritu Jain", rating: 5, text: "Best salon in Indore for kids grooming! My daughter loves coming here. Gentle, patient, and so skilled." },
  { name: "Kavita Agarwal", rating: 5, text: "Amazing party makeup! Everyone asked who did my makeup. Clean, hygienic, and truly premium experience." },
];

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-20 md:py-28 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">What Clients Say</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold gold-text">Client Reviews</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-primary/15 bg-card/50 backdrop-blur-sm p-8 md:p-10 text-center glow-gold"
            >
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-elegant text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-6">
                "{reviews[current].text}"
              </p>
              <p className="font-body text-sm font-semibold text-primary tracking-wide">
                — {reviews[current].name}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? "bg-primary w-6" : "bg-primary/30"}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
