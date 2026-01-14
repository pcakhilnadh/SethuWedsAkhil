import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { weddingData } from "@/data/weddingData";
import groomAvatar from "@assets/akhil_avatar_1768316293680.png";
import brideAvatar from "@assets/sethu_avatar_1768316293680.png";

export function CoupleSection() {
  return (
    <section id="couple" className="py-32 lg:py-48 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-primary/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <SectionHeading title="The Happy Couple" subtitle="Meeting of two souls" />

        <div className="max-w-5xl mx-auto space-y-32 lg:space-y-48">
          
          {/* Groom */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="flex-1 order-2 md:order-1 text-center md:text-right space-y-6">
              <div>
                <h3 className="text-4xl lg:text-6xl font-display text-foreground mb-3 font-light">{weddingData.groom.fullName}</h3>
                <p className="text-primary/60 font-display tracking-[0.3em] uppercase text-xs mb-6">{weddingData.groom.role}</p>
                <div className="space-y-4 text-muted-foreground/80 font-light text-lg lg:text-xl leading-relaxed">
                  <p className="italic">"{weddingData.groom.quote}"</p>
                  <div className="h-[1px] w-12 bg-primary/20 ml-auto mr-0 hidden md:block" />
                  <p className="text-sm tracking-widest uppercase opacity-60">{weddingData.groom.location}</p>
                </div>
              </div>
            </div>
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0 order-1 md:order-2">
              <div className="absolute inset-0 rounded-2xl border border-primary/10 rotate-3 group-hover:rotate-6 transition-transform duration-700" />
              <div className="absolute inset-0 bg-secondary/5 rounded-2xl -rotate-3" />
              <img 
                src={groomAvatar} 
                alt={weddingData.groom.fullName} 
                className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10 filter sepia-[0.1]"
              />
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl border border-primary/10 -rotate-3" />
              <div className="absolute inset-0 bg-secondary/5 rounded-2xl rotate-3" />
              <img 
                src={brideAvatar} 
                alt={weddingData.bride.fullName} 
                className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10 filter sepia-[0.1]"
              />
            </div>
            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <h3 className="text-4xl lg:text-6xl font-display text-foreground mb-3 font-light">{weddingData.bride.fullName}</h3>
                <p className="text-primary/60 font-display tracking-[0.3em] uppercase text-xs mb-6">{weddingData.bride.role}</p>
                <div className="space-y-4 text-muted-foreground/80 font-light text-lg lg:text-xl leading-relaxed">
                  <p className="italic">"{weddingData.bride.quote}"</p>
                  <div className="h-[1px] w-12 bg-primary/20 mr-auto ml-0 hidden md:block" />
                  <p className="text-sm tracking-widest uppercase opacity-60">{weddingData.bride.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
