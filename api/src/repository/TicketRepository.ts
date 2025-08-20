import { ITicket } from "../entities/ticket.entity";
import { ITicketRepository } from "../interfaces/repositoryInterfaces/ITicketRepository";
import { Ticket } from "../models/ticket.model";

export class TicketRepository implements ITicketRepository {
    async create(ticket: Partial<ITicket>) {
        const newTicket = new Ticket(ticket);
        return newTicket.save();
    }

    async findByEvent(eventId: string) {
        return await Ticket.find({ eventId });
    }
    async findByPersonId(personId: string): Promise<ITicket | null> {
        return Ticket.findOne({ personId }).lean<ITicket>().exec()
    }
    async updateStatus(personId: string, status: "valid" | "used" | "invalid") {
        const updated = await Ticket.findOneAndUpdate({personId:personId}, { status }, { new: true });
        if (!updated) throw new Error("Ticket not found while updating");
        return updated;
    }
}
