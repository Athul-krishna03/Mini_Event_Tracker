export interface IPersonDTO {
    id: string;
    name: string;
    email: string;
    role: "attendee" | "judge" | "guest";
    createdAt: string;
    ticketStatus: string;
    ticketUrl: string;
}
