import { useEffect, useState } from "react";
import logo from "@assets/logo_1768316403138.jpeg";

interface SiteLoadingComponentProps {
  onLoadingComplete: () => void;
}

export function SiteLoadingComponent({ onLoadingComplete }: SiteLoadingComponentProps) {
  const [progress, setProgress] = useState(0);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [isLetterRevealing, setIsLetterRevealing] = useState(false);

  useEffect(() => {
    // Preload all assets
    const imagesToPreload = [
      "/wedding-music.mp3",
      logo,
    ];

    // Add video element to preload
    const videoToPreload = document.createElement("video");
    videoToPreload.src = "/couple_video.mp4";
    videoToPreload.preload = "auto";

    let loadedCount = 0;
    const totalAssets = imagesToPreload.length + 1; // images + video

    const updateProgress = () => {
      loadedCount++;
      const newProgress = (loadedCount / totalAssets) * 100;
      setProgress(newProgress);

      if (loadedCount >= totalAssets) {
        // Start envelope opening animation
        setTimeout(() => {
          setIsEnvelopeOpening(true);
          
          // Start letter reveal
          setTimeout(() => {
            setIsLetterRevealing(true);
            
            // Complete loading
            setTimeout(() => {
              onLoadingComplete();
            }, 1500);
          }, 800);
        }, 500);
      }
    };

    // Preload images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = src;
    });

    // Preload video
    videoToPreload.onloadeddata = updateProgress;
    videoToPreload.onerror = updateProgress;

    // Fallback timeout in case some assets fail
    const timeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(100);
        setIsEnvelopeOpening(true);
        setTimeout(() => {
          setIsLetterRevealing(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 1500);
        }, 800);
      }
    }, 8000);

    return () => {
      clearTimeout(timeout);
      videoToPreload.remove();
    };
  }, [onLoadingComplete, progress]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Envelope Container */}
      <div className="relative z-10">
        {/* Envelope Body */}
        <div 
          className={`relative w-80 h-56 transition-all duration-1000 ${
            isEnvelopeOpening ? 'scale-110' : 'scale-100'
          }`}
        >
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg shadow-2xl border-2 border-rose-200">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-rose-400">❤</div>
              <div className="absolute top-4 right-4 text-rose-400">❤</div>
              <div className="absolute bottom-4 left-4 text-rose-400">❤</div>
              <div className="absolute bottom-4 right-4 text-rose-400">❤</div>
            </div>
          </div>

          {/* Letter/Card Inside */}
          <div 
            className={`absolute inset-4 bg-white rounded shadow-xl flex flex-col items-center justify-center transition-all duration-1000 ${
              isLetterRevealing ? 'translate-y-[-120%] opacity-100' : 'translate-y-0 opacity-90'
            }`}
          >
            {/* Logo on the letter */}
            <div className="mb-3">
              <img 
                src={logo} 
                alt="Wedding Logo" 
                className="w-20 h-20 object-contain rounded-full shadow-lg border-4 border-rose-200"
              />
            </div>
            
            {/* Bride and Groom Names */}
            <div className="text-center px-4 mb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg font-serif text-gray-800 font-semibold">Sethu</span>
                <span className="text-rose-500 text-xl">♥</span>
                <span className="text-lg font-serif text-gray-800 font-semibold">Akhil</span>
              </div>
              <p className="text-xs font-serif text-gray-500 italic mb-1">You're Invited</p>
              <p className="text-sm font-serif text-rose-600 font-medium">March 29, 2026</p>
            </div>
          </div>

          {/* Envelope Flap - Top */}
          <div 
            className={`absolute top-0 left-0 right-0 h-32 transition-all duration-1000 origin-top ${
              isEnvelopeOpening ? 'rotate-x-180 -translate-y-1' : 'rotate-x-0'
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <svg 
              viewBox="0 0 320 128" 
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            >
              <polygon 
                points="0,0 160,100 320,0" 
                className={`transition-all duration-1000 ${
                  isEnvelopeOpening 
                    ? 'fill-rose-200' 
                    : 'fill-gradient-to-br from-rose-200 to-pink-200'
                }`}
                fill="url(#flap-gradient)"
              />
              <defs>
                <linearGradient id="flap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fecdd3" />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </linearGradient>
              </defs>
              {/* Decorative seal */}
              {!isEnvelopeOpening && (
                <circle cx="160" cy="50" r="20" fill="#be123c" opacity="0.7" />
              )}
            </svg>
          </div>
        </div>

        {/* Loading Progress */}
        {!isLetterRevealing && (
          <div className="mt-8 text-center">
            <div className="w-64 h-1.5 bg-rose-200 rounded-full overflow-hidden mx-auto mb-3">
              <div 
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-rose-600 font-serif animate-pulse">
              {progress < 100 ? 'Preparing your invitation...' : 'Opening...'}
            </p>
          </div>
        )}
      </div>

      {/* CSS for 3D transform */}
      <style>{`
        .rotate-x-180 {
          transform: rotateX(-180deg);
        }
        .rotate-x-0 {
          transform: rotateX(0deg);
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}
