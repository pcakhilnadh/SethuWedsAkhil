import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
import { RightDetailsComponent } from "@/components/RightDetailsComponent";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { format } from "date-fns";
import { weddingData } from "@/data/weddingData";

// Assets
import coupleImg from "@assets/couple_1768316554062.jpeg";
import groomAvatar from "@assets/akhil_avatar_1768316293680.png";
import brideAvatar from "@assets/sethu_avatar_1768316293680.png";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-stretch overflow-hidden">
        {/* Mobile: Stacked | Desktop: Split */}
        <div className="flex flex-col lg:flex-row w-full h-full">
          <LeftPhotoComponent coupleImg={coupleImg} altText={`${weddingData.groom.name} & ${weddingData.bride.name}`} />
          <RightDetailsComponent weddingData={weddingData} />
        </div>
      </section>

      {/* COUPLE SECTION */}
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

      {/* STORY SECTION */}
      <section id="story" className="py-24 lg:py-32 bg-secondary/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading title="Our Love Story" subtitle="How it all began" />

          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg mx-auto text-muted-foreground font-light leading-relaxed text-xl"
            >
              <p>
                "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
              </p>
              <p>
                Our journey began as a beautiful coincidence that blossomed into something extraordinary. Through shared laughter, quiet moments, and life's little adventures, we discovered that we weren't just partners, but best friends destined to walk this path together.
              </p>
              <p>
                As we prepare to embark on this new chapter of our lives, we carry with us the blessings of our families and the warmth of your love. We can't wait to celebrate our union with the people who mean the most to us.
              </p>
            </motion.div>
            
            <div className="flex justify-center pt-8">
              <span className="font-script text-5xl text-primary opacity-60">~ Always & Forever ~</span>
            </div>
          </div>
        </div>
      </section>

      {/* WEDDING EVENT */}
      <section id="wedding" className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading title="The Wedding" subtitle="Join us for the moment" />

          <EventCard 
            title={weddingData.wedding.ceremony.title}
            date={weddingData.wedding.ceremony.date}
            time={weddingData.wedding.ceremony.time}
            location={weddingData.wedding.ceremony.location}
            description={weddingData.wedding.ceremony.description}
            mapUrl="https://maps.google.com" // Placeholder
            calendarUrl="https://calendar.google.com" // Placeholder
          />
        </div>
      </section>

      {/* RECEPTION EVENT */}
      <section id="reception" className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="The Reception" subtitle="Celebrate with us" />

          <EventCard 
            title={weddingData.wedding.reception.title}
            date={weddingData.wedding.reception.date}
            time={weddingData.wedding.reception.time}
            location={weddingData.wedding.reception.location}
            description={weddingData.wedding.reception.description}
            mapUrl="https://maps.google.com" // Placeholder
            calendarUrl="https://calendar.google.com" // Placeholder
            delay={0.2}
          />
        </div>
      </section>

      {/* PEOPLE SECTION */}
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

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-script text-5xl md:text-6xl text-primary/80 mb-6">{weddingData.groom.name} & {weddingData.bride.name}</h2>
          <p className="font-display text-lg tracking-widest uppercase opacity-60 mb-8">{weddingData.wedding.dateString} • {weddingData.wedding.location}</p>
          <p className="text-sm opacity-40 font-light">
            With love, we can't wait to see you there.
          </p>
        </div>
      </footer>
    </div>
  );
}
