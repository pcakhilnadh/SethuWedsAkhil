import { weddingData } from "@/data/weddingData";

export function FooterSection() {
  return (
    <footer className="bg-foreground text-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-script text-5xl md:text-6xl text-primary/80 mb-6">{weddingData.groom.name} & {weddingData.bride.name}</h2>
        <p className="font-display text-lg tracking-widest uppercase opacity-60 mb-8">{weddingData.wedding.dateString} • {weddingData.wedding.location}</p>
        <p className="text-sm opacity-40 font-light">
          With love, we can't wait to see you there.
        </p>
      </div>
    </footer>
  );
}
