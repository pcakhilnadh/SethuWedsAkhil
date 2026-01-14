import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Events Hook
export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch events");
      return api.events.list.responses[200].parse(await res.json());
    },
  });
}

// People Hook
export function usePeople() {
  return useQuery({
    queryKey: [api.people.list.path],
    queryFn: async () => {
      const res = await fetch(api.people.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch people");
      return api.people.list.responses[200].parse(await res.json());
    },
  });
}

// Stories Hook
export function useStories() {
  return useQuery({
    queryKey: [api.stories.list.path],
    queryFn: async () => {
      const res = await fetch(api.stories.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stories");
      return api.stories.list.responses[200].parse(await res.json());
    },
  });
}
