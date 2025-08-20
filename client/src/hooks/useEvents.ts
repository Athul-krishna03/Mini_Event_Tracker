
import { fetchEvents } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


export const useEvents = (status: "upcoming" | "ongoing" | "past") => {
    return useQuery({
        queryKey: ["events", status],
        queryFn: () => fetchEvents(status),
        staleTime: 1000 * 60, 
    });
};
