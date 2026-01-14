import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

export function StorySection() {
  return (
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
  );
}
