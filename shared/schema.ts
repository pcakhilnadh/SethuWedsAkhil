import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  mapUrl: text("map_url"),
  calendarUrl: text("calendar_url"),
});

export const people = pgTable("people", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // groom, bride, bridesmaid, groomsman, family
  address: text("address"),
  profession: text("profession"),
  photoUrl: text("photo_url").notNull(),
  bio: text("bio"),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  order: serial("order").notNull(),
  imageUrl: text("image_url"),
});

// Schemas
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertPersonSchema = createInsertSchema(people).omit({ id: true });
export const insertStorySchema = createInsertSchema(stories).omit({ id: true });

// Types
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Person = typeof people.$inferSelect;
export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type Story = typeof stories.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
