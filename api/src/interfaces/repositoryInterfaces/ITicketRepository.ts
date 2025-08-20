import { ITicket } from "../../entities/ticket.entity";

export interface ITicketRepository {
    create(ticket: Partial<ITicket>): Promise<ITicket>;
    findByEvent(eventId: string): Promise<ITicket[]>;
    findByPersonId(personId: string): Promise<ITicket | null>
    updateStatus(ticketId: string, status: "valid" | "used" | "invalid"): Promise<ITicket | null>;
}
