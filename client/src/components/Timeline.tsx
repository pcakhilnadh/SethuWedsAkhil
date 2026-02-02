import { useEffect, useRef, useState, useCallback } from 'react';
import { timelineScenes } from '@/data/timelineData';
import { TimelineSceneComponent } from './TimelineScene';

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);

  const totalScenes = timelineScenes.length;

  // Navigate to next/previous scene with smooth animation
  const animateToScene = useCallback((targetScene: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const clampedScene = Math.max(0, Math.min(totalScenes - 1, targetScene));
    setCurrentScene(clampedScene);
  }, [totalScenes]);

  // Navigate to next/previous scene
  const goToNextScene = useCallback(() => {
    const nextScene = Math.min(totalScenes - 1, currentScene + 1);
    if (nextScene !== currentScene) {
      animateToScene(nextScene);
    }
  }, [totalScenes, currentScene, animateToScene]);

  const goToPrevScene = useCallback(() => {
    const prevScene = Math.max(0, currentScene - 1);
    if (prevScene !== currentScene) {
      animateToScene(prevScene);
    }
  }, [currentScene, animateToScene]);

  // Handle wheel events for horizontal scrolling - snap to scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Detect horizontal scroll intent (trackpad horizontal gesture or shift+wheel)
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.5;

      if (isHorizontalScroll && Math.abs(e.deltaX) > 2) {
        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();

        // Reset accumulator if too much time has passed
        if (now - lastWheelTimeRef.current > 200) {
          wheelAccumulatorRef.current = 0;
        }
        lastWheelTimeRef.current = now;

        // Accumulate wheel delta
        wheelAccumulatorRef.current += e.deltaX;

        // Threshold to trigger scene change (prevents over-sensitive scrolling)
        const threshold = 50;

        if (wheelAccumulatorRef.current > threshold) {
          wheelAccumulatorRef.current = 0;
          goToNextScene();
        } else if (wheelAccumulatorRef.current < -threshold) {
          wheelAccumulatorRef.current = 0;
          goToPrevScene();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [goToNextScene, goToPrevScene]);

  // Handle touch events for swipe scrolling - snap to scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isHorizontalGesture = false;
    let gestureDecided = false;
    let swipeHandled = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
      isHorizontalGesture = false;
      gestureDecided = false;
      swipeHandled = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || e.touches.length !== 1 || swipeHandled) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Decide gesture direction once
      if (!gestureDecided && (Math.abs(deltaX) > 15 || Math.abs(deltaY) > 15)) {
        gestureDecided = true;
        isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY);
      }

      if (isHorizontalGesture) {
        e.preventDefault();

        // Swipe threshold to trigger scene change
        const swipeThreshold = 50;

        if (deltaX < -swipeThreshold) {
          // Swiped left -> go to next scene
          swipeHandled = true;
          goToNextScene();
        } else if (deltaX > swipeThreshold) {
          // Swiped right -> go to previous scene
          swipeHandled = true;
          goToPrevScene();
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      isHorizontalGesture = false;
      gestureDecided = false;
      swipeHandled = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [goToNextScene, goToPrevScene]);

  // Calculate the horizontal translation
  const translateX = -(currentScene * 100);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative bg-background h-screen overflow-hidden"
    >
      {/* Timeline viewport */}
      <div className="w-full h-full">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
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

      {/* Navigation dots - smaller on mobile */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2">
        {timelineScenes.map((_, index) => (
          <button
            key={index}
            onClick={() => animateToScene(index)}
            className={`rounded-full transition-all duration-300 ${index === currentScene
              ? 'h-1.5 w-6 md:h-2 md:w-8 bg-primary'
              : 'h-1.5 w-1.5 md:h-2 md:w-2 bg-primary/40 hover:bg-primary/60'
              }`}
            aria-label={`Go to scene ${index + 1}`}
          />
        ))}
      </div>


      {/* Navigation arrows - smaller on mobile */}
      <button
        onClick={goToPrevScene}
        disabled={currentScene === 0}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background/90 transition-all"
        aria-label="Previous scene"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNextScene}
        disabled={currentScene === totalScenes - 1}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background/90 transition-all"
        aria-label="Next scene"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
