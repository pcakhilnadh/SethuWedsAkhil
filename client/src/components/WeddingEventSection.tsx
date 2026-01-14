import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { weddingData } from "@/data/weddingData";

export function WeddingEventSection() {
  return (
    <section id="wedding" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading title="The Wedding" subtitle="Join us for the moment" />

        <EventCard 
          title={weddingData.wedding.ceremony.title}
          date={weddingData.wedding.ceremony.date}
          time={weddingData.wedding.ceremony.time}
          location={weddingData.wedding.ceremony.location}
          description={weddingData.wedding.ceremony.description}
          mapUrl="https://maps.google.com"
          calendarUrl="https://calendar.google.com"
        />
      </div>
    </section>
  );
}
