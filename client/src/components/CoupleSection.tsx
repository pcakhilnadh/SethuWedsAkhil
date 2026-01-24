import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Linkedin, Instagram, Briefcase, Building2, MapPin, Users, UserCircle, Heart } from "lucide-react";

export function CoupleSection() {
  return (
    <section id="couple" className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Top Section - Couple Photo Left, Title Right */}
      <div className="grid lg:grid-cols-2 min-h-[50vh] lg:min-h-[60vh]">
        {/* Left - Couple Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[50vh] lg:h-auto flex items-center justify-center px-6 sm:px-8 lg:px-12"
        >
          <div className="w-full max-w-md lg:max-w-lg">
            <img 
              src={weddingData.couple.photoWithoutBg}
              alt={`${weddingData.groom.name} & ${weddingData.bride.name}`}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Right - Section Title */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-0"
        >
          <div className="max-w-xl">
            <div className="space-y-4 sm:space-y-6">
              <div className="h-px w-12 sm:w-20 bg-rose-500/40" />
              <h2 className="text-4xl sm:text-5xl lg:text-8xl font-display font-light text-gray-900 leading-tight sm:leading-none">
                Meet<br />The Couple
              </h2>
              <p className="text-base sm:text-lg text-gray-500 font-light tracking-wide">
                Two souls destined to become one
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Groom & Bride Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
        
        {/* Groom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-center mb-20 sm:mb-32 lg:mb-48"
        >
          {/* Photo - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-500/20 to-amber-500/20 blur-2xl opacity-60 transition-opacity duration-700" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={weddingData.groom.photoUrl} 
                  alt={weddingData.groom.fullName}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Details - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-3 sm:mb-4 font-medium">
                {weddingData.groom.role}
              </p>
              <h3 className="text-3xl sm:text-5xl lg:text-7xl font-display font-light text-gray-900 mb-4 sm:mb-6">
                {weddingData.groom.fullName}
              </h3>
              {(weddingData.groom.social.linkedin || weddingData.groom.social.instagram) && (
                <div className="flex gap-3 mt-6">
                  {weddingData.groom.social.linkedin && (
                    <a 
                      href={weddingData.groom.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {weddingData.groom.social.instagram && (
                    <a 
                      href={weddingData.groom.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3 mt-6 sm:mt-8">
              {/* Profession & Company - Combined Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="group relative bg-gradient-to-br from-rose-500/5 to-rose-500/10 p-3 sm:p-3 rounded-lg border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-md bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-rose-600/70 font-medium mb-0.5">Profession</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{weddingData.groom.profession}</p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-3 sm:p-3 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-md bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-600/70 font-medium mb-0.5">Company</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{weddingData.groom.company}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group relative bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-blue-600/70 font-medium mb-0.5">Address</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 leading-relaxed">{weddingData.groom.address}</p>
                  </div>
                </div>
              </div>

              {/* Family */}
              <div className="group relative bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-3 sm:p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-purple-600/70 font-medium mb-2 sm:mb-3">Family</p>
                    <div className="space-y-2">
                      {/* Father */}
                      <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 sm:p-2 border border-purple-100">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-purple-500/20 text-purple-700 text-[9px] sm:text-[10px] font-semibold rounded uppercase tracking-wide">Father</span>
                        <span className="text-[11px] sm:text-xs text-gray-900 font-medium">{weddingData.groom.family.father}</span>
                      </div>
                      {/* Mother */}
                      <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 sm:p-2 border border-purple-100">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-rose-500/20 text-rose-700 text-[9px] sm:text-[10px] font-semibold rounded uppercase tracking-wide">Mother</span>
                        <span className="text-[11px] sm:text-xs text-gray-900 font-medium">{weddingData.groom.family.mother}</span>
                      </div>
                    </div>
                  </div>
                </div>
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
          <div className="lg:col-span-3 space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-3 sm:mb-4 font-medium">
                {weddingData.bride.role}
              </p>
              <h3 className="text-3xl sm:text-5xl lg:text-7xl font-display font-light text-gray-900 mb-4 sm:mb-6">
                {weddingData.bride.fullName}
              </h3>
              {(weddingData.bride.social.linkedin || weddingData.bride.social.instagram) && (
                <div className="flex gap-3 mt-6">
                  {weddingData.bride.social.linkedin && (
                    <a 
                      href={weddingData.bride.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {weddingData.bride.social.instagram && (
                    <a 
                      href={weddingData.bride.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3 mt-6 sm:mt-8">
              {/* Profession & Company - Combined Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="group relative bg-gradient-to-br from-rose-500/5 to-rose-500/10 p-3 sm:p-3 rounded-lg border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-md bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-rose-600/70 font-medium mb-0.5">Profession</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{weddingData.bride.profession}</p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-3 sm:p-3 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-md bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-600/70 font-medium mb-0.5">Company</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{weddingData.bride.company}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group relative bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-blue-600/70 font-medium mb-0.5">Address</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 leading-relaxed">{weddingData.bride.address}</p>
                  </div>
                </div>
              </div>

              {/* Family */}
              <div className="group relative bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-3 sm:p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-purple-600/70 font-medium mb-2 sm:mb-3">Family</p>
                    <div className="space-y-2">
                      {/* Father */}
                      <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 sm:p-2 border border-purple-100">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-purple-500/20 text-purple-700 text-[9px] sm:text-[10px] font-semibold rounded uppercase tracking-wide">Father</span>
                        <span className="text-[11px] sm:text-xs text-gray-900 font-medium">{weddingData.bride.family.father}</span>
                      </div>
                      {/* Mother */}
                      <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 sm:p-2 border border-purple-100">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-rose-500/20 text-rose-700 text-[9px] sm:text-[10px] font-semibold rounded uppercase tracking-wide">Mother</span>
                        <span className="text-[11px] sm:text-xs text-gray-900 font-medium">{weddingData.bride.family.mother}</span>
                      </div>
                      {/* Sister */}
                      <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 sm:p-2 border border-purple-100">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-blue-500/20 text-blue-700 text-[9px] sm:text-[10px] font-semibold rounded uppercase tracking-wide">Sister</span>
                        <span className="text-[11px] sm:text-xs text-gray-900 font-medium">{weddingData.bride.family.sister}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo - Takes 2 columns */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-rose-500/20 blur-2xl opacity-60 transition-opacity duration-700" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={weddingData.bride.photoUrl} 
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
