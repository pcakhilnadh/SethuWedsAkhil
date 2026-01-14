import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logo from "@assets/logo_1768316403138.jpeg";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Couple", href: "#couple" },
  { label: "Our Story", href: "#story" },
  { label: "Wedding", href: "#wedding" },
  { label: "Reception", href: "#reception" },
  { label: "People", href: "#people" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-display",
        scrolled 
          ? "bg-white/70 backdrop-blur-xl border-b border-primary/5 shadow-sm py-3" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-foreground p-2 hover:bg-primary/5 rounded-full transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Left Links */}
        <div className="hidden lg:flex items-center space-x-12 flex-1 justify-end">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-xs uppercase tracking-[0.25em] hover:text-primary transition-all duration-300 text-foreground/70 hover:tracking-[0.3em] font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Logo Center */}
        <div className="mx-12 flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="relative block">
            <img 
              src={logo} 
              alt="Logo" 
              className={cn(
                "rounded-full border border-primary/10 transition-all duration-700 object-cover hover:scale-105",
                scrolled ? "h-14 w-14" : "h-24 w-24"
              )}
            />
          </a>
        </div>

        {/* Desktop Right Links */}
        <div className="hidden lg:flex items-center space-x-12 flex-1 justify-start">
          {NAV_ITEMS.slice(3).map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-xs uppercase tracking-[0.25em] hover:text-primary transition-all duration-300 text-foreground/70 hover:tracking-[0.3em] font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Placeholder for balance on mobile */}
        <div className="w-8 lg:hidden"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 lg:hidden",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button 
          className="absolute top-6 right-6 p-2 text-foreground"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="text-3xl font-display text-foreground hover:text-primary transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
