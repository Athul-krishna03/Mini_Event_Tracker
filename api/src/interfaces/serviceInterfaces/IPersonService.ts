import { IPersonDTO } from "../../utils/DTO/IPersonDTO";


export interface IPersonService{
    addPerson(data: {
        name: string;
        email: string;
        role: "attendee" | "judge" | "guest";
        eventId: string;
    }): Promise<IPersonDTO>;
    getPersonByRole(role: "attendee" | "judge" | "guest", eventId: string): Promise<IPersonDTO[]>;
    verifyTicket(eventId: string, personId: string): Promise<{
        success: boolean;
        message: string;
        personId?: string;
        eventId?: string;
        ticketStatus?: string;
        ticketUrl?: string;
    }>;
}