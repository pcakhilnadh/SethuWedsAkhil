import { MapPin, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  mapUrl?: string;
  calendarUrl?: string;
  delay?: number;
}

export function EventCard({ title, date, time, location, description, mapUrl, calendarUrl, delay = 0 }: EventCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="bg-white p-8 md:p-12 shadow-xl border border-border/50 max-w-2xl mx-auto relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="text-center space-y-6">
        <h3 className="text-3xl md:text-4xl font-display text-foreground">{title}</h3>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-muted-foreground py-4 border-y border-border/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-primary rounded-full" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{time}</span>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-foreground/80 font-light italic">
          "{description}"
        </p>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{location}</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          {mapUrl && (
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary text-primary-foreground font-display text-lg tracking-wide hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Directions
            </a>
          )}
          {calendarUrl && (
            <a 
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-secondary text-secondary-foreground font-display text-lg tracking-wide hover:bg-secondary/80 transition-all border border-secondary-foreground/10"
            >
              Add to Calendar
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
