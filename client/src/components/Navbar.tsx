import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logo from "@assets/logo_1768316403138.jpeg";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Couple", href: "#couple" },
  { label: "Our Story", href: "#story" },
  // { label: "Gallery", href: "#gallery" },
  { label: "Wedding", href: "#wedding" },
  { label: "Reception", href: "#reception" },
  // { label: "People", href: "#people" },
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
    <>
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-display",
        scrolled 
          ? "bg-white/70 backdrop-blur-xl border-b border-primary/5 shadow-sm py-2 sm:py-3" 
          : "bg-white/90 backdrop-blur-sm lg:bg-transparent py-4 sm:py-6"
      )}
    >
      <div className="container mx-auto px-3 sm:px-6 flex items-center justify-between max-w-7xl">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-foreground p-2 hover:bg-primary/5 rounded-full transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Left Links */}
        <div className="hidden lg:flex items-center space-x-12 flex-1 justify-end">
          {NAV_ITEMS.slice(0, 2).map((item) => (
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
        <div className="mx-4 sm:mx-8 lg:mx-12 flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="relative block">
            <div className={cn(
              "rounded-full border-2 border-amber-400 transition-all duration-700 hover:scale-105 bg-white p-1.5 sm:p-2",
              scrolled ? "h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" : "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            )}>
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </div>

        {/* Desktop Right Links */}
        <div className="hidden lg:flex items-center space-x-12 flex-1 justify-start">
          {NAV_ITEMS.slice(2).map((item) => (
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
    </nav>
    
    {/* Mobile Menu Overlay - Outside nav for proper z-index */}
    {mobileOpen && (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[9999] lg:hidden overflow-y-auto">
        <button 
          className="absolute top-6 right-6 p-2 text-foreground z-[10000]"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-2xl sm:text-3xl font-display text-foreground hover:text-primary transition-colors duration-300 text-center"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    )}
  </>
  );
}
