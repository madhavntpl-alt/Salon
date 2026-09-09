import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const serviceOptions = [
  "Eyebrow Shaping", "Facial Threading", "Waxing", "Bleach", "Cleanup", "Hydra Facial", "O3+ Facial",
  "Haircut", "Hair Styling", "Hair Spa", "Keratin Treatment", "Nanoplastia", "Botox Hair Therapy",
  "Bridal Makeup", "Engagement Makeup", "Party Makeup",
  "Manicure & Pedicure", "Nail Art", "Body Polishing", "Back Massage",
  "Kids Haircut", "Kids Grooming",
];

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  phone: z.string().regex(/^\+91\s?\d{10}$/, "Enter valid Indian number (+91 XXXXX XXXXX)"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date").refine(
    (d) => new Date(d).getDay() !== 0,
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
      const sanitizedService = data.service.slice(0, 100);
      const sanitizedDate = data.date;

      const message = encodeURIComponent(
        `Hello, I am ${sanitizedName}. I want to book ${sanitizedService} on ${sanitizedDate} at New Modern Beauty Salon.`
      );
      window.open(`https://wa.me/919039362327?text=${message}`, "_blank");

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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Schedule Your Visit</p>
          <h2 id="booking-heading" className="font-display text-3xl md:text-5xl font-bold gold-text">Book Appointment</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-8 md:p-10 glow-gold space-y-5"
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
              maxLength={15}
              placeholder="+91 XXXXX XXXXX"
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
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;