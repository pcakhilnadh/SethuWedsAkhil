import { useState, useEffect } from "react";
import { differenceInSeconds, intervalToDuration } from "date-fns";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(intervalToDuration({ start: new Date(), end: targetDate }));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (differenceInSeconds(targetDate, now) <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft(intervalToDuration({ start: now, end: targetDate }));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("flex items-center justify-center space-x-4 md:space-x-12", className)}>
      <TimeBox value={timeLeft.days || 0} label="Days" />
      <div className="text-primary/10 text-xl font-light pt-2">:</div>
      <TimeBox value={timeLeft.hours || 0} label="Hrs" />
      <div className="text-primary/10 text-xl font-light pt-2">:</div>
      <TimeBox value={timeLeft.minutes || 0} label="Min" />
      <div className="text-primary/10 text-xl font-light pt-2">:</div>
      <TimeBox value={timeLeft.seconds || 0} label="Sec" />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center min-w-[4rem] md:min-w-[6rem]">
        <span className="text-3xl md:text-5xl font-display font-light text-primary/80">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-4 h-[1px] w-4 bg-primary/20" />
      <span className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-medium">
        {label}
      </span>
    </div>
  );
}
