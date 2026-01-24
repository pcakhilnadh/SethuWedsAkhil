import { TimelineScene } from '@/types/timeline';

export const timelineScenes: TimelineScene[] = [
  {
    id: 'scene-1',
    scrollRange: [0.0, 0.2],
    title: 'The Beginning',
    date: 'October 2025',
    message: 'Every love story starts with a single moment. Ours began as a beautiful coincidence, a chance encounter that would change everything.',
    image: {
      src: '/phone-notification.jpg',
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
    title: 'First Conversations',
    date: '4 November 2025',
    message: 'Through shared laughter and late-night conversations, we discovered a connection that went beyond words. Every moment together felt natural, effortless.',
    image: {
      src: '/chat.png',
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
    title: 'Building Dreams',
    date: '23 November 2025',
    message: 'As time passed, we realized we weren\'t just creating memories—we were building a future. Our dreams began to intertwine, painting a picture of tomorrow together.',
    image: {
      src: '/first_meet.png',
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
    title: 'The Promise',
    date: '04 January 2026',
    message: 'We discovered that we weren\'t just partners, but best friends destined to walk this path together. In quiet moments and life\'s little adventures, our bond grew stronger.',
    image: {
      src: '/engagement.jpg',
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
    title: 'Our Wedding Day',
    date: '29 March, 2026',
    message: 'And now, we invite you to witness the next chapter of our story. With hearts full of joy and the blessings of our families, we begin our forever.',
    image: {
      src: '/Wedding.png',
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
