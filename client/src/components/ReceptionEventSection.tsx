import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { weddingData } from "@/data/weddingData";

export function ReceptionEventSection() {
  return (
    <section id="reception" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="The Reception" subtitle="Celebrate with us" />

        <EventCard 
          title={weddingData.wedding.reception.title}
          date={weddingData.wedding.reception.date}
          time={weddingData.wedding.reception.time}
          location={weddingData.wedding.reception.location}
          description={weddingData.wedding.reception.description}
          mapUrl="https://maps.google.com"
          calendarUrl="https://calendar.google.com"
          delay={0.2}
        />
      </div>
    </section>
  );
}
