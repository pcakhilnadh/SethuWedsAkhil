import { type InsertEvent, type InsertPerson, type InsertStory, type Event, type Person, type Story } from "@shared/schema";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getPeople(): Promise<Person[]>;
  getStories(): Promise<Story[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  createPerson(person: InsertPerson): Promise<Person>;
  createStory(story: InsertStory): Promise<Story>;
}

export class InMemoryStorage implements IStorage {
  private events: Event[] = [];
  private people: Person[] = [];
  private stories: Story[] = [];
  private eventIdCounter = 1;
  private personIdCounter = 1;
  private storyIdCounter = 1;

  async getEvents(): Promise<Event[]> {
    return this.events;
  }

  async getPeople(): Promise<Person[]> {
    return this.people;
  }

  async getStories(): Promise<Story[]> {
    return this.stories;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const event: Event = {
      id: this.eventIdCounter++,
      ...insertEvent,
    };
    this.events.push(event);
    return event;
  }

  async createPerson(insertPerson: InsertPerson): Promise<Person> {
    const person: Person = {
      id: this.personIdCounter++,
      ...insertPerson,
    };
    this.people.push(person);
    return person;
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const story: Story = {
      id: this.storyIdCounter++,
      ...insertStory,
    };
    this.stories.push(story);
    return story;
  }
}

export const storage = new InMemoryStorage();
