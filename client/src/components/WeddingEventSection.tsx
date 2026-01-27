import { weddingData } from "@/data/weddingData";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Navigation, Download, ExternalLink } from "lucide-react";

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
    <section id="wedding" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Subtle warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-orange-50/30 to-stone-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display text-center text-stone-800 mb-12"
        >
          Wedding
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Single Card Container */}
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Column - Venue & Navigation */}
              <div className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 p-8 lg:p-10 flex flex-col justify-between min-h-[400px]">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  {/* Venue Name */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display text-white mb-4 leading-tight">
                    {ceremony.place}
                  </h3>
                  
                  {/* Full Address */}
                  <div className="flex items-start gap-3 text-white/90">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base leading-relaxed">
                      {ceremony.location}
                    </p>
                  </div>
                </div>
                
                {/* Navigate Button */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={ceremony.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-8 inline-flex items-center justify-center gap-3 bg-white text-rose-700 rounded-xl px-6 py-4 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Navigation className="w-5 h-5" />
                  Navigate to Venue
                  <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </div>
              
              {/* Right Column - Details & Actions */}
              <div className="p-8 lg:p-10 flex flex-col justify-between bg-white">
                {/* Invitation Message */}
                <div className="mb-8">
                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light italic border-l-4 border-rose-200 pl-4">
                    "{ceremony.description}"
                  </p>
                </div>
                
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-5 h-5 text-rose-600" />
                    </div>
                    <p className="text-xs uppercase text-stone-500 font-medium tracking-wider mb-1">Date</p>
                    <p className="text-sm font-semibold text-stone-800">{ceremony.date}</p>
                  </div>
                  
                  <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-5 h-5 text-pink-600" />
                    </div>
                    <p className="text-xs uppercase text-stone-500 font-medium tracking-wider mb-1">Time</p>
                    <p className="text-sm font-semibold text-stone-800">{ceremony.time}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={generateCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-stone-900 text-white rounded-xl px-4 py-3.5 font-medium text-sm hover:bg-stone-800 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={downloadInvitationCard}
                    className="flex items-center justify-center gap-2 bg-rose-600 text-white rounded-xl px-4 py-3.5 font-medium text-sm hover:bg-rose-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Card
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
