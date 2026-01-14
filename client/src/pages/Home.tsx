import { Navbar } from "@/components/Navbar";
import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
import { RightDetailsComponent } from "@/components/RightDetailsComponent";
import { CoupleSection } from "@/components/CoupleSection";
import { GallerySection } from "@/components/GallerySection";
import { WeddingEventSection } from "@/components/WeddingEventSection";
import { ReceptionEventSection } from "@/components/ReceptionEventSection";
import { PeopleSection } from "@/components/PeopleSection";
import { FooterSection } from "@/components/FooterSection";
import { weddingData } from "@/data/weddingData";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-stretch overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full h-full">
          <LeftPhotoComponent videoUrl={weddingData.couple.videoUrl} />
          <RightDetailsComponent weddingData={weddingData} />
        </div>
      </section>

      <CoupleSection />
      {/* <GallerySection /> */}
      <WeddingEventSection />
      <ReceptionEventSection />
      {/* <PeopleSection /> */}
      <FooterSection />
    </div>
  );
}
