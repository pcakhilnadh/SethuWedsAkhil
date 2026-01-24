export interface TimelineImage {
  src: string;
  alt: string;
  focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

export interface SceneMotion {
  enter: {
    scale: number;
    opacity: number;
    y: number;
  };
  exit: {
    scale: number;
    opacity: number;
    y: number;
  };
  imageParallax?: number;
}

export interface TimelineScene {
  id: string;
  scrollRange: [number, number]; // [start, end] as percentages 0-1
  title: string;
  date: string;
  message: string;
  image: TimelineImage;
  motion: SceneMotion;
}
