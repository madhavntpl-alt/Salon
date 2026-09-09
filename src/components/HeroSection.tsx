import { motion } from "framer-motion";
import { CalendarDays, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 md:pb-24">
      {/* Translucent overlay allowing Global 3D Background to shine through */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] hero-pattern pointer-events-none"
        style={{ backgroundImage: "url('/hero-pattern.svg')" }}
      />

      {/* Glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <Logo
            width={144}
            height={144}
            className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full object-cover border-2 border-primary/40 glow-gold mb-6"
            priority
            alt="New Modern Beauty Salon Logo"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold gold-text leading-tight"
        >
          New Modern<br />Beauty Salon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-elegant text-xl md:text-2xl lg:text-3xl text-foreground/80 mt-4 italic"
        >
          Beauty, Care & Confidence for Every Woman & Child
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-4 text-muted-foreground font-body text-sm md:text-base"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary" />
          Trusted Beauty Experts Since 2011
          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground" />
          Indore
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#booking"
            className="flex items-center gap-2 px-8 py-4 rounded-full gold-gradient text-primary-foreground font-body font-semibold text-base glow-gold-hover transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <CalendarDays className="w-5 h-5" aria-hidden="true" /> Book Appointment
          </a>
          <a
            href="https://wa.me/919039362327"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-primary/40 text-primary font-body font-semibold text-base hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp Now
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {["Est. 2011", "Women & Kids Only", "Certified Experts"].map((badge) => (
            <span key={badge} className="px-4 py-2 rounded-full border border-primary/20 text-primary/80 font-body text-xs tracking-widest uppercase">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
