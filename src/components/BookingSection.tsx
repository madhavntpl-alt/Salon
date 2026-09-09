import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";

const serviceOptions = [
  "Eyebrow Shaping", "Facial Threading", "Waxing", "Bleach", "Cleanup", "Hydra Facial", "O3+ Facial",
  "Haircut", "Hair Styling", "Hair Spa", "Keratin Treatment", "Nanoplastia", "Botox Hair Therapy",
  "Bridal Makeup", "Engagement Makeup", "Party Makeup",
  "Manicure & Pedicure", "Nail Art", "Body Polishing", "Back Massage",
  "Kids Haircut", "Kids Grooming",
];

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  phone: z
    .string()
    .min(10, "Please enter at least 10 digits")
    .regex(
      /^(?:\+91[\s-]?)?[6-9]\d{9}$/,
      "Enter a valid Indian phone number (e.g. +91 90393 62327 or 9039362327)"
    ),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date").refine(
    (d) => {
      const parts = d.split("-").map(Number);
      if (parts.length === 3) {
        return new Date(parts[0], parts[1] - 1, parts[2]).getDay() !== 0;
      }
      return true;
    },
    "Salon is closed on Sundays"
  ),
});

type BookingForm = z.infer<typeof bookingSchema>;

const BookingSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", phone: "", service: "", date: "" },
  });

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const sanitizedName = data.name.trim().slice(0, 100);
      const sanitizedPhone = data.phone.trim().slice(0, 20);
      const sanitizedService = data.service.slice(0, 100);
      const sanitizedDate = data.date;

      const message = encodeURIComponent(
        `Hello, I am ${sanitizedName} (${sanitizedPhone}). I want to book ${sanitizedService} on ${sanitizedDate} at New Modern Beauty Salon.`
      );
      window.open(`https://wa.me/919039362327?text=${message}`, "_blank", "noopener,noreferrer");

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="py-20 md:py-28 relative" aria-labelledby="booking-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/15 to-transparent pointer-events-none" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.25 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">Schedule Your Visit</p>
          <h2 id="booking-heading" className="font-display text-3xl md:text-5xl font-bold gold-text">Book Appointment</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.25 }}
          className="max-w-lg mx-auto"
        >
          <Card3DTilt
            maxTilt={3}
            scale={1.008}
            className="rounded-2xl border border-primary/20 bg-card/90 p-8 md:p-10 glow-gold"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
          <div>
            <label htmlFor="name" className="font-body text-sm text-muted-foreground mb-1.5 block">Your Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              required
              maxLength={100}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border transition-colors text-foreground font-body text-sm focus:outline-none focus:border-primary/40 ${
                errors.name ? "border-destructive" : "border-primary/10"
              }`}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-destructive font-body" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="font-body text-sm text-muted-foreground mb-1.5 block">Phone Number</label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              required
              maxLength={17}
              placeholder="+91 90393 62327 or 9039362327"
              className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border transition-colors text-foreground font-body text-sm focus:outline-none focus:border-primary/40 ${
                errors.phone ? "border-destructive" : "border-primary/10"
              }`}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-sm text-destructive font-body" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="service" className="font-body text-sm text-muted-foreground mb-1.5 block">Select Service</label>
            <select
              id="service"
              {...register("service")}
              required
              className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border transition-colors text-foreground font-body text-sm focus:outline-none focus:border-primary/40 appearance-none ${
                errors.service ? "border-destructive" : "border-primary/10"
              }`}
              aria-invalid={errors.service ? "true" : "false"}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="">Choose a service</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="mt-1.5 text-sm text-destructive font-body" role="alert">
                {errors.service.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="font-body text-sm text-muted-foreground mb-1.5 block">Preferred Date</label>
            <input
              id="date"
              type="date"
              {...register("date")}
              required
              min={today}
              className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border transition-colors text-foreground font-body text-sm focus:outline-none focus:border-primary/40 ${
                errors.date ? "border-destructive" : "border-primary/10"
              }`}
              aria-invalid={errors.date ? "true" : "false"}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <p id="date-error" className="mt-1.5 text-sm text-destructive font-body" role="alert">
                {errors.date.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full gold-gradient text-primary-foreground font-body font-semibold text-base glow-gold-hover transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>Booking...</span>
              </>
            ) : (
              <>
                <CalendarDays className="w-5 h-5" aria-hidden="true" />
                <span>Book via WhatsApp</span>
              </>
            )}
          </button>

          {submitStatus === "success" && (
            <div className="flex items-center gap-2 justify-center text-green-500" role="status" aria-live="polite">
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              <p className="font-body text-sm">Redirecting to WhatsApp...</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-2 justify-center text-destructive" role="alert">
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
              <p className="font-body text-sm">Something went wrong. Please try again.</p>
            </div>
          )}

          <div className="flex items-center gap-2 justify-center text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-primary/70" aria-hidden="true" />
            <p className="font-body text-xs">Salon remains closed on Sundays</p>
          </div>
        </form>
      </Card3DTilt>
    </motion.div>
  </div>
    </section>
  );
};

export default BookingSection;