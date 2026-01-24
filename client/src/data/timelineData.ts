import { TimelineScene } from '@/types/timeline';

export const timelineScenes: TimelineScene[] = [
  {
    id: 'scene-1',
    scrollRange: [0.0, 0.2],
    date: 'The Beginning',
    message: 'Every love story starts with a single moment. Ours began as a beautiful coincidence, a chance encounter that would change everything.',
    image: {
      src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80',
      alt: 'The beginning of our journey',
      focalPoint: 'center'
    },
    motion: {
      enter: {
        scale: 1.0,
        opacity: 1,
        y: 0
      },
      exit: {
        scale: 0.8,
        opacity: 0,
        y: -60
      },
      imageParallax: 50
    }
  },
  {
    id: 'scene-2',
    scrollRange: [0.2, 0.4],
    date: 'First Conversations',
    message: 'Through shared laughter and late-night conversations, we discovered a connection that went beyond words. Every moment together felt natural, effortless.',
    image: {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
      alt: 'Growing closer',
      focalPoint: 'center'
    },
    motion: {
      enter: {
        scale: 1.2,
        opacity: 0,
        y: 100
      },
      exit: {
        scale: 0.8,
        opacity: 0,
        y: -60
      },
      imageParallax: 45
    }
  },
  {
    id: 'scene-3',
    scrollRange: [0.4, 0.6],
    date: 'Building Dreams',
    message: 'As time passed, we realized we weren\'t just creating memories—we were building a future. Our dreams began to intertwine, painting a picture of tomorrow together.',
    image: {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      alt: 'Building dreams together',
      focalPoint: 'center'
    },
    motion: {
      enter: {
        scale: 1.2,
        opacity: 0,
        y: 100
      },
      exit: {
        scale: 0.8,
        opacity: 0,
        y: -60
      },
      imageParallax: 40
    }
  },
  {
    id: 'scene-4',
    scrollRange: [0.6, 0.8],
    date: 'The Promise',
    message: 'We discovered that we weren\'t just partners, but best friends destined to walk this path together. In quiet moments and life\'s little adventures, our bond grew stronger.',
    image: {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      alt: 'A promise of forever',
      focalPoint: 'center'
    },
    motion: {
      enter: {
        scale: 1.2,
        opacity: 0,
        y: 100
      },
      exit: {
        scale: 0.8,
        opacity: 0,
        y: -60
      },
      imageParallax: 35
    }
  },
  {
    id: 'scene-5',
    scrollRange: [0.8, 1.0],
    date: 'March 29, 2026',
    message: 'And now, we invite you to witness the next chapter of our story. With hearts full of joy and the blessings of our families, we begin our forever.',
    image: {
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      alt: 'Our wedding day',
      focalPoint: 'center'
    },
    motion: {
      enter: {
        scale: 1.2,
        opacity: 0,
        y: 100
      },
      exit: {
        scale: 0.95,
        opacity: 0.3,
        y: -40
      },
      imageParallax: 30
    }
  }
];
