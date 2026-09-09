import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book Now", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 300);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
        >
          <Logo width={48} height={48} className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-primary/30" alt="New Modern Beauty Salon" />
          <span className="font-display text-sm md:text-base font-semibold gold-text hidden sm:block">New Modern Beauty Salon</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="font-body text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2 py-1 -mx-2 -my-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+919039362327"
            className="flex items-center gap-2 px-4 py-2 rounded-full gold-gradient text-primary-foreground font-body text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-primary cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background p-2 rounded-md"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-primary/10"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="font-body text-base text-muted-foreground hover:text-primary transition-colors py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+919039362327"
                className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-full gold-gradient text-primary-foreground font-body font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
