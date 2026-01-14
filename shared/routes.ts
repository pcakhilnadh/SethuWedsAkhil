import { z } from 'zod';
import { insertEventSchema, insertPersonSchema, insertStorySchema, events, people, stories } from './schema';

export const api = {
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },
  people: {
    list: {
      method: 'GET' as const,
      path: '/api/people',
      responses: {
        200: z.array(z.custom<typeof people.$inferSelect>()),
      },
    },
  },
  stories: {
    list: {
      method: 'GET' as const,
      path: '/api/stories',
      responses: {
        200: z.array(z.custom<typeof stories.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
