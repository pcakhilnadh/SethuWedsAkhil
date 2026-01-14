import { motion } from "framer-motion";

interface LeftPhotoComponentProps {
  videoUrl: string;
}

export function LeftPhotoComponent({ videoUrl }: LeftPhotoComponentProps) {
  return (
    <div className="lg:w-1/2 relative h-[50vh] lg:h-screen overflow-hidden flex items-center justify-center bg-white p-8 lg:p-12">
      <div className="relative w-4/5 h-4/5">
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
