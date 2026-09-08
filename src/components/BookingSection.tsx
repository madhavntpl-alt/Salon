import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, AlertCircle } from "lucide-react";

const serviceOptions = [
  "Eyebrow Shaping", "Facial Threading", "Waxing", "Bleach", "Cleanup", "Hydra Facial", "O3+ Facial",
  "Haircut", "Hair Styling", "Hair Spa", "Keratin Treatment", "Nanoplastia", "Botox Hair Therapy",
  "Bridal Makeup", "Engagement Makeup", "Party Makeup",
  "Manicure & Pedicure", "Nail Art", "Body Polishing", "Back Massage",
  "Kids Haircut", "Kids Grooming",
];

const BookingSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !service || !date) return;

    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedService = service.slice(0, 100);
    const sanitizedDate = date;

    const message = encodeURIComponent(
      `Hello, I am ${sanitizedName}. I want to book ${sanitizedService} on ${sanitizedDate} at New Modern Beauty Salon.`
    );
    window.open(`https://wa.me/919039362327?text=${message}`, "_blank");
  };

  return (
    <section id="booking" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Schedule Your Visit</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold gold-text">Book Appointment</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-8 md:p-10 glow-gold space-y-5"
        >
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1.5 block">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-primary/10 text-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1.5 block">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={15}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-primary/10 text-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1.5 block">Select Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-primary/10 text-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors appearance-none"
            >
              <option value="">Choose a service</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1.5 block">Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-primary/10 text-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full gold-gradient text-primary-foreground font-body font-semibold text-base glow-gold-hover transition-all duration-300 hover:scale-[1.02]"
          >
            <CalendarDays className="w-5 h-5" /> Book via WhatsApp
          </button>

          <div className="flex items-center gap-2 justify-center text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-primary/70" />
            <p className="font-body text-xs">Salon remains closed on Sundays</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
