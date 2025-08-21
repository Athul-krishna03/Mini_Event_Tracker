import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    venue: z.string().min(2),
    description: z.string().optional(),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    programs: z.array(z.string()).optional()
});
