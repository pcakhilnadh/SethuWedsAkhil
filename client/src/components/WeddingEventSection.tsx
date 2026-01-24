import { weddingData } from "@/data/weddingData";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Navigation, Download, ArrowRight, Heart, Sparkles } from "lucide-react";

export function WeddingEventSection() {
  const ceremony = weddingData.wedding.ceremony;
  
  const generateCalendarUrl = () => {
    const startDate = new Date(weddingData.wedding.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ceremony.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(ceremony.description)}&location=${encodeURIComponent(ceremony.location)}`;
  };

  const downloadInvitationCard = () => {
    const link = document.createElement('a');
    link.href = ceremony.invitationCardUrl;
    link.download = 'Wedding-Invitation-Card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="wedding" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      {/* Elegant gradient background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-purple-50/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,63,94,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Refined Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
            <span className="text-rose-600 text-xs tracking-[0.3em] uppercase font-medium">The Wedding</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-slate-800 tracking-tight mb-2">
            Sacred Union
          </h2>
        </motion.div>

        {/* Glassmorphic Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Venue Info with Glassmorphism */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative"
          >
            {/* Sparkling border animation */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 animate-pulse" />
            
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
              {/* Venue Header with Glass Effect */}
              <div className="relative bg-gradient-to-r from-rose-500/90 via-pink-500/90 to-purple-500/90 backdrop-blur-sm p-6">
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative text-white">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-xs tracking-wider uppercase text-white/90">Wedding Ceremony</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-display mb-2">
                    {ceremony.place}
                  </h3>
                  <p className="text-white/90 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {ceremony.geolocation}
                  </p>
                </div>
              </div>

              {/* Date & Time with Glassmorphic Cards */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs uppercase text-rose-600 font-semibold mb-1 text-center tracking-wider">Date</p>
                    <p className="text-sm font-bold text-slate-800 text-center">{ceremony.date}</p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs uppercase text-purple-600 font-semibold mb-1 text-center tracking-wider">Time</p>
                    <p className="text-sm font-bold text-slate-800 text-center">{ceremony.time}</p>
                  </motion.div>
                </div>

                {/* Address with Glass Effect */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-white/30 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-400 to-gray-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-xs uppercase text-slate-600 font-semibold block mb-2 tracking-wider">Venue Address</span>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{ceremony.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Actions with Glassmorphism */}
          <div className="space-y-6">
            {/* Quick Info Cards with Glass Effect */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-2">29</div>
                  <div className="text-xs text-rose-600 uppercase tracking-wider font-semibold">March 2026</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">10:00 AM</div>
                  <div className="text-xs text-purple-600 uppercase tracking-wider font-semibold">Ceremony</div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons with Glass Effect */}
            <div className="space-y-4">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={ceremony.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full bg-white/20 backdrop-blur-xl border border-white/30 text-slate-800 rounded-2xl px-6 py-4 font-semibold text-center overflow-hidden shadow-2xl hover:bg-white/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Navigation className="w-5 h-5" />
                  Navigate to Venue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={generateCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl px-4 py-4 font-semibold text-center shadow-xl hover:shadow-2xl transition-all text-sm backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </span>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadInvitationCard}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl px-4 py-4 font-semibold text-center shadow-xl hover:shadow-2xl transition-all text-sm backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Description Card with Glass Effect */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-5 border border-white/40 shadow-2xl"
            >
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {ceremony.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
