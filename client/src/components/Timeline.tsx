import { useEffect, useRef, useState } from 'react';
import { timelineScenes } from '@/data/timelineData';
import { TimelineSceneComponent } from './TimelineScene';

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerBottom = rect.bottom;

      // Check if the section is in view and should be fixed
      const shouldBeFixed = containerTop <= 0 && containerBottom >= viewportHeight;
      setIsFixed(shouldBeFixed);

      if (shouldBeFixed) {
        // Calculate horizontal scroll progress while fixed
        const scrollableDistance = rect.height - viewportHeight;
        const scrolled = -containerTop;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        setScrollProgress(progress);
      } else if (containerTop > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate the horizontal translation
  const totalScenes = timelineScenes.length;
  const translateX = -(scrollProgress * (totalScenes - 1) * 100);

  return (
    <section 
      id="story" 
      ref={containerRef} 
      className="relative bg-background"
      style={{ height: `${totalScenes * 100}vh` }}
    >
      {/* Fixed viewport that stays in place while user scrolls */}
      <div 
        className={`${isFixed ? 'fixed' : 'absolute'} top-0 left-0 w-full h-screen overflow-hidden bg-background`}
        style={{
          bottom: isFixed ? 'auto' : (scrollProgress >= 1 ? '0' : 'auto'),
          top: isFixed ? '0' : (scrollProgress >= 1 ? 'auto' : '0'),
        }}
      >
        <div 
          className="flex h-full transition-transform duration-100 ease-out"
          style={{ 
            transform: `translateX(${translateX}vw)`,
            width: `${totalScenes * 100}vw`
          }}
        >
          {timelineScenes.map((scene, index) => (
            <TimelineSceneComponent
              key={scene.id}
              scene={scene}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
