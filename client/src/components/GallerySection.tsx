import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { weddingData } from "@/data/weddingData";
import { useState } from "react";
import { X } from "lucide-react";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="gallery" className="py-24 lg:py-32 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading title="Our Gallery" subtitle="Captured moments" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {weddingData.gallery.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
