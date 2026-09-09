import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Pause, Play } from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";

const reviews = [
  { name: "Priya Sharma", rating: 5, text: "Absolutely the best bridal makeup experience! Ranjana ma'am understood exactly what I wanted. Felt like a queen on my wedding day." },
  { name: "Anita Verma", rating: 5, text: "My go-to salon for every occasion. The facials here are premium quality and the ambiance is so relaxing. Highly recommend!" },
  { name: "Sneha Patel", rating: 5, text: "Got keratin done and my hair has never looked better. The team is so professional and caring. Worth every penny!" },
  { name: "Ritu Jain", rating: 5, text: "Best salon in Indore for kids grooming! My daughter loves coming here. Gentle, patient, and so skilled." },
  { name: "Kavita Agarwal", rating: 5, text: "Amazing party makeup! Everyone asked who did my makeup. Clean, hygienic, and truly premium experience." },
];

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % reviews.length);
    }, 5000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopTimer();
    } else {
      startTimer();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, startTimer, stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
      stopTimer();
      setIsPlaying(false);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrent((prev) => (prev + 1) % reviews.length);
      stopTimer();
      setIsPlaying(false);
    }
  };

  return (
    <section id="reviews" className="py-20 md:py-28 relative" aria-labelledby="reviews-heading">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.25 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">What Clients Say</p>
          <h2 id="reviews-heading" className="font-display text-3xl md:text-5xl font-bold gold-text">Client Reviews</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card3DTilt
                maxTilt={4}
                scale={1.01}
                className="rounded-2xl border border-primary/20 bg-card/90 p-8 md:p-10 text-center glow-gold"
              >
                <div className="flex items-center justify-center gap-1 mb-4" aria-hidden="true">
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
              </Card3DTilt>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(idx);
                  stopTimer();
                  setIsPlaying(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${idx === current ? "bg-primary w-6" : "bg-primary/30"}`}
                aria-label={`Go to review ${idx + 1}`}
                aria-current={idx === current ? "true" : "false"}
              />
            ))}

            <button
              onClick={togglePlay}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  togglePlay();
                }
              }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause className="w-5 h-5" aria-hidden="true" /> : <Play className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;