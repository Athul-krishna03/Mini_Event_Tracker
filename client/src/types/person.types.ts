export interface Person {
    id: string
    name: string
    email: string
    role: "attendee" | "judge" | "guest"
    ticketStatus: "valid" | "used" | "invalid"
    ticketUrl: string
    createdAt: string
}
