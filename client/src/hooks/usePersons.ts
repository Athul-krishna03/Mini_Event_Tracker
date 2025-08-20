import { fetchPersonsByRole } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const usePersons = (role: "attendee" | "judge" | "guest", eventId: string) => {
    return useQuery({
        queryKey: ["persons", role, eventId],
        queryFn: () => fetchPersonsByRole(role, eventId),
        enabled: !!eventId,
        staleTime: 1000 * 60,
    })
}
