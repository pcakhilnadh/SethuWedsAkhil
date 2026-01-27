import { useEffect, useRef, useState, useCallback } from 'react';
import { timelineScenes } from '@/data/timelineData';
import { TimelineSceneComponent } from './TimelineScene';

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedViewportRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  
  // Refs for smooth scrolling
  const progressRef = useRef(0);
  const currentSceneRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);

  const totalScenes = timelineScenes.length;

  // Get progress value for a specific scene index
  const getProgressForScene = useCallback((sceneIndex: number) => {
    return sceneIndex / (totalScenes - 1);
  }, [totalScenes]);

  // Smoothly animate to target scene
  const animateToScene = useCallback((targetScene: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const clampedScene = Math.max(0, Math.min(totalScenes - 1, targetScene));
    currentSceneRef.current = clampedScene;
    const targetProgress = getProgressForScene(clampedScene);

    const animate = () => {
      const current = progressRef.current;
      const diff = targetProgress - current;
      
      if (Math.abs(diff) < 0.001) {
        progressRef.current = targetProgress;
        setScrollProgress(targetProgress);
        return;
      }

      // Slower, smoother easing for better visual effect
      const newProgress = current + diff * 0.05;
      progressRef.current = newProgress;
      setScrollProgress(newProgress);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [totalScenes, getProgressForScene]);

  // Update vertical scroll position to match scene
  const syncVerticalScroll = useCallback((scene: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = rect.height - viewportHeight;
    const containerOffsetTop = window.scrollY + rect.top;
    const progress = getProgressForScene(scene);
    const targetScrollY = containerOffsetTop + (progress * scrollableDistance);
    
    window.scrollTo({ top: targetScrollY, behavior: 'auto' });
  }, [getProgressForScene]);

  // Navigate to next/previous scene
  const goToNextScene = useCallback(() => {
    const nextScene = Math.min(totalScenes - 1, currentSceneRef.current + 1);
    if (nextScene !== currentSceneRef.current) {
      isUserScrollingRef.current = true;
      animateToScene(nextScene);
      syncVerticalScroll(nextScene);
      setTimeout(() => { isUserScrollingRef.current = false; }, 400);
    }
  }, [totalScenes, animateToScene, syncVerticalScroll]);

  const goToPrevScene = useCallback(() => {
    const prevScene = Math.max(0, currentSceneRef.current - 1);
    if (prevScene !== currentSceneRef.current) {
      isUserScrollingRef.current = true;
      animateToScene(prevScene);
      syncVerticalScroll(prevScene);
      setTimeout(() => { isUserScrollingRef.current = false; }, 400);
    }
  }, [animateToScene, syncVerticalScroll]);

  // Handle vertical scroll -> horizontal movement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Skip if user is doing horizontal scroll
      if (isUserScrollingRef.current) return;
      
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerBottom = rect.bottom;

      const shouldBeFixed = containerTop <= 0 && containerBottom >= viewportHeight;
      setIsFixed(shouldBeFixed);

      if (shouldBeFixed) {
        const scrollableDistance = rect.height - viewportHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        progressRef.current = progress;
        setScrollProgress(progress);
        
        // Update current scene based on progress
        const scene = Math.round(progress * (totalScenes - 1));
        currentSceneRef.current = scene;
      } else if (containerTop > 0) {
        progressRef.current = 0;
        setScrollProgress(0);
        currentSceneRef.current = 0;
      } else {
        progressRef.current = 1;
        setScrollProgress(1);
        currentSceneRef.current = totalScenes - 1;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalScenes]);

  // Handle wheel events for horizontal scrolling - snap to scene
  useEffect(() => {
    const fixedViewport = fixedViewportRef.current;
    if (!fixedViewport || !isFixed) return;

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

    fixedViewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      fixedViewport.removeEventListener('wheel', handleWheel);
    };
  }, [isFixed, goToNextScene, goToPrevScene]);

  // Handle touch events for swipe scrolling - snap to scene
  useEffect(() => {
    const fixedViewport = fixedViewportRef.current;
    if (!fixedViewport || !isFixed) return;

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

    fixedViewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    fixedViewport.addEventListener('touchmove', handleTouchMove, { passive: false });
    fixedViewport.addEventListener('touchend', handleTouchEnd, { passive: true });
    fixedViewport.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      fixedViewport.removeEventListener('touchstart', handleTouchStart);
      fixedViewport.removeEventListener('touchmove', handleTouchMove);
      fixedViewport.removeEventListener('touchend', handleTouchEnd);
      fixedViewport.removeEventListener('touchcancel', handleTouchEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isFixed, goToNextScene, goToPrevScene]);

  // Calculate the horizontal translation
  const translateX = -(scrollProgress * (totalScenes - 1) * 100);

  // Add extra buffer (1 viewport height) at the end to let last scene stay
  const bufferHeight = 100; // vh
  const totalHeight = (totalScenes * 100) + bufferHeight;

  // Navbar height offset (approximate based on navbar styling)
  const navbarHeight = '80px'; // Adjust if needed

  return (
    <section 
      id="story" 
      ref={containerRef} 
      className="relative bg-background"
      style={{ height: `${totalHeight}vh` }}
    >
      {/* Fixed viewport that stays in place while user scrolls */}
      <div 
        ref={fixedViewportRef}
        className={`${isFixed ? 'fixed' : 'absolute'} left-0 w-full overflow-hidden bg-background`}
        style={{
          top: isFixed ? navbarHeight : (scrollProgress >= 1 ? 'auto' : '0'),
          bottom: isFixed ? 'auto' : (scrollProgress >= 1 ? '0' : 'auto'),
          height: isFixed ? `calc(100vh - ${navbarHeight})` : '100vh',
        }}
      >
        <div 
          className="flex h-full"
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
