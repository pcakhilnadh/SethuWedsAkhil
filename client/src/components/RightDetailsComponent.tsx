import { motion } from "framer-motion";
import { Countdown } from "@/components/Countdown";

interface RightDetailsComponentProps {
  weddingDate: Date;
}

export function RightDetailsComponent({ weddingDate }: RightDetailsComponentProps) {
  return (
    <div className="lg:w-3/5 flex items-center justify-center bg-white relative py-20 lg:py-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40 pointer-events-none" />
      
      <div className="text-center px-6 md:px-16 max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <span className="font-script text-3xl md:text-5xl text-primary/70 block mb-6 italic tracking-wide">
            Save the Date
          </span>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 leading-[1.1] tracking-tight">
            <span className="block font-light">Akhil Nadh</span>
            <span className="inline-block my-4 text-primary/30 text-2xl md:text-4xl px-4 relative">
              <span className="absolute left-0 top-1/2 w-8 h-[1px] bg-primary/20 -translate-x-full" />
              &
              <span className="absolute right-0 top-1/2 w-8 h-[1px] bg-primary/20 translate-x-full" />
            </span>
            <span className="block font-light">Sethulakshmi</span>
          </h1>

          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="h-[1px] w-12 bg-primary/10" />
            <p className="text-sm md:text-base font-display uppercase tracking-[0.4em] text-foreground/60">
              March 29, 2025
            </p>
            <div className="h-[1px] w-12 bg-primary/10" />
          </div>

          <div className="relative group p-8 md:p-12">
            <div className="absolute inset-0 border border-primary/5 rounded-3xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
            <Countdown targetDate={weddingDate} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
