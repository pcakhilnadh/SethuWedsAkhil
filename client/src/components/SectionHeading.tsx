import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-16 space-y-4", className)}>
      {subtitle && (
        <span className={cn(
          "font-script text-3xl md:text-4xl block mb-2",
          light ? "text-primary/90" : "text-primary"
        )}>
          {subtitle}
        </span>
      )}
      
      <div className="relative inline-block">
        <h2 className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider relative z-10",
          light ? "text-white" : "text-foreground"
        )}>
          {title}
        </h2>
        <div className="flex justify-center mt-4 items-center gap-4 opacity-60">
          <div className={cn("h-[1px] w-12 md:w-24", light ? "bg-white/50" : "bg-primary/30")} />
          <Heart className={cn("w-4 h-4 fill-current", light ? "text-white/70" : "text-primary/40")} />
          <div className={cn("h-[1px] w-12 md:w-24", light ? "bg-white/50" : "bg-primary/30")} />
        </div>
      </div>
    </div>
  );
}
