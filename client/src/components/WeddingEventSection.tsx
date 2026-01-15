import { weddingData } from "@/data/weddingData";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Navigation, Map } from "lucide-react";

export function WeddingEventSection() {
  const ceremony = weddingData.wedding.ceremony;
  
  // Generate Google Calendar link
  const generateCalendarUrl = () => {
    const startDate = new Date(weddingData.wedding.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ceremony.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(ceremony.description)}&location=${encodeURIComponent(ceremony.location)}`;
  };

  return (
    <section id="wedding" className="py-12 sm:py-16 lg:py-32 bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 bg-rose-500/10 rounded-full mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-600 font-semibold">The Wedding Ceremony</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-7xl font-display font-light text-gray-900 mb-3 sm:mb-4 px-4">{ceremony.title}</h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-light px-4">{ceremony.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Venue Name */}
            <div className="bg-gradient-to-r from-rose-500 to-amber-500 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display text-white text-center">{ceremony.place}</h3>
            </div>

            {/* Event Details Grid */}
            <div className="p-4 sm:p-6 lg:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Date */}
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Date</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{ceremony.date}</p>
                </div>

                {/* Time */}
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Time</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{ceremony.time}</p>
                </div>

                {/* Location */}
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Venue</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{ceremony.geolocation || 'Aluva'}</p>
                </div>
              </div>

              {/* Full Address */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Address</p>
                    <p className="text-xs sm:text-sm text-gray-900 leading-relaxed">{ceremony.location}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Navigate Button */}
                <a
                  href={ceremony.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:from-rose-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-rose-500/25 hover:-translate-y-0.5"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
                  <span>Navigate with Maps</span>
                </a>

                {/* Add to Calendar Button */}
                <a
                  href={generateCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white text-gray-900 rounded-xl text-sm sm:text-base font-semibold border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  <span>Add to Calendar</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
