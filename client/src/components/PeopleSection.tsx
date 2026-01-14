import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { weddingData } from "@/data/weddingData";
import { Instagram } from "lucide-react";

export function PeopleSection() {
  return (
    <section id="people" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Important People" subtitle="Our Beloved Family" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {weddingData.people.map((person, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] shadow-md hover:shadow-xl transition-all"
            >
              <img 
                src={person.profileUrl} 
                alt={person.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-2xl font-display mb-1">{person.name}</h4>
                    <p className="text-white/80 font-light text-sm mb-1">{person.relationship}</p>
                    <p className="text-white/60 font-light text-xs uppercase tracking-wide">
                      {person.side === "groom" ? "Groom's Side" : "Bride's Side"}
                    </p>
                  </div>
                  {person.instagramUrl && (
                    <a 
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Instagram className="w-5 h-5 text-white hover:text-pink-400 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
