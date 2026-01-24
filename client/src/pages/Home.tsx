import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
import { RightDetailsComponent } from "@/components/RightDetailsComponent";
import { CoupleSection } from "@/components/CoupleSection";
import { StorySection } from "@/components/StorySection";
import { GallerySection } from "@/components/GallerySection";
import { WeddingEventSection } from "@/components/WeddingEventSection";
import { ReceptionEventSection } from "@/components/ReceptionEventSection";
import { PeopleSection } from "@/components/PeopleSection";
import { FooterSection } from "@/components/FooterSection";
import { SiteLoadingComponent } from "@/components/SiteLoadingComponent";
import { weddingData } from "@/data/weddingData";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        
        try {
          // Try playing directly first
          await audioRef.current.play();
          setShowButton(true);
        } catch (error) {
          // If blocked, try with muted first
          try {
            audioRef.current.muted = true;
            setIsMuted(true);
            await audioRef.current.play();
            setShowButton(true);
            // Unmute after small delay
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                setIsMuted(false);
              }
            }, 100);
          } catch (err) {
            // If still blocked, show button and wait for user interaction
            setShowButton(true);
            const startOnInteraction = async () => {
              if (audioRef.current) {
                try {
                  await audioRef.current.play();
                } catch (error) {
                  console.error("Failed to play music:", error);
                }
              }
            };

            document.addEventListener('click', startOnInteraction, { once: true });
            document.addEventListener('touchstart', startOnInteraction, { once: true });
          }
        }
      }
    };

    const timer = setTimeout(playMusic, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Background Music - Always rendered */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/wedding-music.mp3"
      />

      {/* Music Control Button - Always rendered */}
      {showButton && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {isLoading ? (
        <SiteLoadingComponent onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="bg-background min-h-screen">
          <Navbar />

          {/* HERO SECTION */}
          <section id="home" className="min-h-screen relative flex items-stretch overflow-hidden pt-20 sm:pt-24 lg:pt-0">
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
              <LeftPhotoComponent videoUrl={weddingData.couple.videoUrl} />
              <RightDetailsComponent weddingData={weddingData} />
            </div>
          </section>

          <CoupleSection />
          <StorySection />
          {/* <GallerySection /> */}
          <WeddingEventSection />
          <ReceptionEventSection />
          {/* <PeopleSection /> */}
          <FooterSection />
        </div>
      )}
    </>
  );
}
