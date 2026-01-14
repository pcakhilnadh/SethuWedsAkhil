import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.events.list.path, async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get(api.people.list.path, async (req, res) => {
    const people = await storage.getPeople();
    res.json(people);
  });

  app.get(api.stories.list.path, async (req, res) => {
    const stories = await storage.getStories();
    res.json(stories);
  });

  // Seed data function
  async function seedData() {
    const existingEvents = await storage.getEvents();
    if (existingEvents.length === 0) {
      await storage.createEvent({
        title: "Wedding",
        date: new Date("2025-03-29T10:30:00"),
        location: "Grand Auditorium",
        description: "Join us as we tie the knot!",
        mapUrl: "https://maps.google.com",
        calendarUrl: "https://calendar.google.com",
      });
      await storage.createEvent({
        title: "Reception",
        date: new Date("2025-03-29T18:00:00"),
        location: "Sunset Banquet Hall",
        description: "Dinner and dancing to follow.",
        mapUrl: "https://maps.google.com",
        calendarUrl: "https://calendar.google.com",
      });
    }

    const existingPeople = await storage.getPeople();
    if (existingPeople.length === 0) {
      await storage.createPerson({
        name: "Akhil Nadh PC",
        role: "Groom",
        address: "Pullolikkal House, Solvent Road, Irinjalakuda",
        profession: "Photographer",
        photoUrl: "@assets/akhil_avatar_1768316293680.png",
      });
      await storage.createPerson({
        name: "Sethulakshmi R",
        role: "Bride",
        address: "Thiruvananthapuram",
        profession: "Software Engineer",
        photoUrl: "@assets/sethu_avatar_1768316293680.png",
      });

      // Additional Family/Friends Seed Data
      await storage.createPerson({
        name: "Father of Groom",
        role: "Father of Groom",
        address: "Irinjalakuda",
        profession: "Retired",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      });
      await storage.createPerson({
        name: "Mother of Groom",
        role: "Mother of Groom",
        address: "Irinjalakuda",
        profession: "Homemaker",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      });
      await storage.createPerson({
        name: "Best Man",
        role: "Best Man",
        address: "Kochi",
        profession: "Engineer",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      });
      await storage.createPerson({
        name: "Maid of Honor",
        role: "Maid of Honor",
        address: "Bangalore",
        profession: "Doctor",
        photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      });
    }

    const existingStories = await storage.getStories();
    if (existingStories.length === 0) {
      await storage.createStory({
        title: "First Meeting",
        content: "We met at a coffee shop and instantly clicked.",
        order: 1,
      });
       await storage.createStory({
        title: "The Proposal",
        content: "It was a magical evening under the stars.",
        order: 2,
      });
    }
  }

  // Run seed
  seedData();

  return httpServer;
}
