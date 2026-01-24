import { useQuery } from "@tanstack/react-query";
import { weddingData } from "../data/weddingData";

// Events Hook
export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      // Return static wedding event data
      return [
        {
          id: 1,
          title: weddingData.wedding.ceremony.title,
          date: weddingData.wedding.ceremony.date,
          time: weddingData.wedding.ceremony.time,
          location: weddingData.wedding.ceremony.place,
          address: weddingData.wedding.ceremony.location,
          description: weddingData.wedding.ceremony.description,
          type: "wedding",
        },
        {
          id: 2,
          title: weddingData.wedding.reception.title,
          date: weddingData.wedding.reception.date,
          time: weddingData.wedding.reception.time,
          location: weddingData.wedding.reception.place,
          address: weddingData.wedding.reception.location,
          description: weddingData.wedding.reception.description,
          type: "reception",
        },
      ];
    },
  });
}

// People Hook
export function usePeople() {
  return useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      // Return static people data
      return weddingData.people;
    },
  });
}

// Stories Hook
export function useStories() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      // Return static stories data (can be empty or added later)
      return [];
    },
  });
}
