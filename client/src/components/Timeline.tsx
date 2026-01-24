import { timelineScenes } from '@/data/timelineData';
import { TimelineSceneComponent } from './TimelineScene';

export function Timeline() {
  return (
    <section id="story" className="relative bg-background">
      {/* Render each scene as a full-height section */}
      {timelineScenes.map((scene, index) => (
        <TimelineSceneComponent
          key={scene.id}
          scene={scene}
          index={index}
        />
      ))}
    </section>
  );
}
