import { useState, useEffect } from "react";
import { differenceInSeconds, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const totalSeconds = differenceInSeconds(targetDate, now);
    
    if (totalSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("flex items-center justify-center space-x-4 md:space-x-12", className)}>
      <TimeBox value={timeLeft.days} label="Days" />
      <div className="text-primary/10 text-xl font-light pt-2">:</div>
      <TimeBox value={timeLeft.hours} label="Hrs" />
      <div className="text-primary/10 text-xl font-light pt-2">:</div>
      <TimeBox value={timeLeft.minutes} label="Min" />
      <div className="text-primary/10 text-xl font-light pt-2">:</div>
      <TimeBox value={timeLeft.seconds} label="Sec" />
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
