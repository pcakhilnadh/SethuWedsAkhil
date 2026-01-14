import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

export function PeopleSection() {
  return (
    <section id="people" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Important People" subtitle="Our Beloved Family" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] shadow-md hover:shadow-xl transition-all"
            >
              {/* Placeholder for family photos */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-muted-foreground/30 font-display text-4xl">
                Photo
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-display mb-1">Family Member {i}</h4>
                <p className="text-white/70 font-light text-sm tracking-wide uppercase">Role / Relation</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
