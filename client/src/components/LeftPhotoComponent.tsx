import { motion } from "framer-motion";

interface LeftPhotoComponentProps {
  videoUrl: string;
}

export function LeftPhotoComponent({ videoUrl }: LeftPhotoComponentProps) {
  return (
    <div className="w-full lg:w-1/2 relative h-[40vh] sm:h-[50vh] lg:h-auto overflow-hidden flex items-center justify-center bg-white p-4 sm:p-6 lg:p-12">
      <div className="relative w-full sm:w-4/5 h-full sm:h-4/5 max-w-lg">
        <div className="absolute inset-0 bg-black/10 z-10 rounded-lg" /> {/* Subtle overlay */}
        <motion.video
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
}
