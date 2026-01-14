import { Navbar } from "@/components/Navbar";
import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
import { RightDetailsComponent } from "@/components/RightDetailsComponent";
import { CoupleSection } from "@/components/CoupleSection";
import { StorySection } from "@/components/StorySection";
import { WeddingEventSection } from "@/components/WeddingEventSection";
import { ReceptionEventSection } from "@/components/ReceptionEventSection";
import { PeopleSection } from "@/components/PeopleSection";
import { FooterSection } from "@/components/FooterSection";
import { weddingData } from "@/data/weddingData";
import coupleImg from "@assets/couple_1768316554062.jpeg";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-stretch overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full h-full">
          <LeftPhotoComponent coupleImg={coupleImg} altText={`${weddingData.groom.name} & ${weddingData.bride.name}`} />
          <RightDetailsComponent weddingData={weddingData} />
        </div>
      </section>

      <CoupleSection />
      <StorySection />
      <WeddingEventSection />
      <ReceptionEventSection />
      <PeopleSection />
      <FooterSection />
    </div>
  );
}
