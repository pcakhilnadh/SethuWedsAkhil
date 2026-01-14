import { motion } from "framer-motion";

interface LeftPhotoComponentProps {
  coupleImg: string;
  altText?: string;
}

export function LeftPhotoComponent({ coupleImg, altText = "Couple" }: LeftPhotoComponentProps) {
  return (
    <div className="lg:w-2/5 relative h-[40vh] lg:h-[85vh] overflow-hidden flex items-center justify-center lg:py-12">
      <div className="relative w-full h-full max-w-2xl">
        <div className="absolute inset-0 bg-black/10 z-10 rounded-lg" /> {/* Subtle overlay */}
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={coupleImg} 
          alt={altText} 
          className="w-full h-full object-cover object-center rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
