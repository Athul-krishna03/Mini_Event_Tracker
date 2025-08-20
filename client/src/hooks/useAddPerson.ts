import { addPerson } from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddPerson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addPerson,
        onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["persons", variables.role, variables.eventId] })
        }
    })
}
