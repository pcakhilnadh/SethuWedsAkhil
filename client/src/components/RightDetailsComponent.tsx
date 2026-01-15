import { motion } from "framer-motion";
import { Countdown } from "@/components/Countdown";
import { Heart } from "lucide-react";
import { weddingData as WeddingDataType } from "@/data/weddingData";

interface RightDetailsComponentProps {
  weddingData: typeof WeddingDataType;
}

export function RightDetailsComponent({ weddingData }: RightDetailsComponentProps) {
  return (
    <div className="w-full lg:w-3/5 flex items-center justify-center bg-white relative py-12 sm:py-16 lg:py-0 lg:pt-24">
      
      <div className="text-center px-4 sm:px-8 md:px-16 max-w-xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-10"
        >
          {/* Header Text */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50 font-medium">
                Save the Date
              </span>
            </motion.div>
          </div>
          
          {/* Names Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-6 space-y-4 sm:space-y-6 lg:space-y-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-foreground tracking-tight leading-none">
                  {weddingData.groom.name}
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="py-1 lg:py-0"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-rose-400 fill-rose-400" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-foreground tracking-tight leading-none">
                  {weddingData.bride.name}
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Wedding Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-2"
          >
            <div className="inline-block px-6 py-2 border border-foreground/10 rounded-full">
              <p className="text-sm tracking-[0.2em] text-foreground/70 font-light">
                {weddingData.wedding.dateShort}
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="pt-2"
          >
            <Countdown targetDate={weddingData.wedding.date} />
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="pt-2"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/40 font-medium">
              We're Getting Married
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
