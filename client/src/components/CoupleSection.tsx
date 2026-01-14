import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import groomAvatar from "@assets/akhil_avatar_1768316293680.png";
import brideAvatar from "@assets/sethu_avatar_1768316293680.png";
import coupleImg from "@assets/couple_1768316554062.jpeg";

export function CoupleSection() {
  return (
    <section id="couple" className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Top Section - Couple Photo Left, Title Right */}
      <div className="grid lg:grid-cols-2 min-h-[60vh]">
        {/* Left - Couple Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[60vh] lg:h-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-amber-500/10" />
          <img 
            src={coupleImg} 
            alt={`${weddingData.groom.name} & ${weddingData.bride.name}`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right - Section Title */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center px-8 lg:px-16 py-16 lg:py-0"
        >
          <div className="max-w-xl">
            <div className="space-y-6">
              <div className="h-px w-20 bg-rose-500/40" />
              <h2 className="text-6xl lg:text-8xl font-display font-light text-gray-900 leading-none">
                Meet<br />The Couple
              </h2>
              <p className="text-lg text-gray-500 font-light tracking-wide">
                Two souls destined to become one
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Groom & Bride Details */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32">
        
        {/* Groom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center mb-32 lg:mb-48"
        >
          {/* Photo - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-500/20 to-amber-500/20 blur-2xl opacity-60 transition-opacity duration-700" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={groomAvatar} 
                  alt={weddingData.groom.fullName}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Details - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4 font-medium">
                {weddingData.groom.role}
              </p>
              <h3 className="text-5xl lg:text-7xl font-display font-light text-gray-900 mb-6">
                {weddingData.groom.fullName}
              </h3>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div className="flex gap-4">
                <div className="w-12 h-px bg-rose-500/30 mt-3 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-lg font-medium text-gray-900">{weddingData.groom.jobTitle}</p>
                  <p className="text-sm text-gray-500">{weddingData.groom.company}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-px bg-rose-500/30 mt-3 flex-shrink-0" />
                <p className="text-gray-700">{weddingData.groom.location}</p>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-px bg-rose-500/30 mt-3 flex-shrink-0" />
                <p className="text-lg italic text-gray-600 leading-relaxed">
                  "{weddingData.groom.quote}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bride Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center"
        >
          {/* Details - Takes 3 columns, comes first on desktop */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4 font-medium">
                {weddingData.bride.role}
              </p>
              <h3 className="text-5xl lg:text-7xl font-display font-light text-gray-900 mb-6">
                {weddingData.bride.fullName}
              </h3>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div className="flex gap-4">
                <div className="w-12 h-px bg-rose-500/30 mt-3 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-lg font-medium text-gray-900">{weddingData.bride.jobTitle}</p>
                  <p className="text-sm text-gray-500">{weddingData.bride.company}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-px bg-rose-500/30 mt-3 flex-shrink-0" />
                <p className="text-gray-700">{weddingData.bride.location}</p>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-px bg-rose-500/30 mt-3 flex-shrink-0" />
                <p className="text-lg italic text-gray-600 leading-relaxed">
                  "{weddingData.bride.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* Photo - Takes 2 columns */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-rose-500/20 blur-2xl opacity-60 transition-opacity duration-700" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={brideAvatar} 
                  alt={weddingData.bride.fullName}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
