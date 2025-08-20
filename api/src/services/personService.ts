import { Types } from "mongoose";
import { IPersonService } from "../interfaces/serviceInterfaces/IPersonService";
import { inject, injectable } from "tsyringe";
import { IPersonRepository } from "../interfaces/repositoryInterfaces/IPersonRepository";
import { ITicketRepository } from "../interfaces/repositoryInterfaces/ITicketRepository";
import { generateQRCode, uploadToCloudinary } from "../utils/qrCodeUrl.service";
import { IEventRepository } from "../interfaces/repositoryInterfaces/IEventRepository";
import { sendTicketEmail } from "../utils/emailService";

@injectable()
export class PersonService implements IPersonService {
    constructor(
        @inject("IPersonRepository") private _personRepo: IPersonRepository,
        @inject("ITicketRepository") private _ticketRepo: ITicketRepository,
        @inject("IEventRepository") private _eventRepo: IEventRepository
    ){}
        async addPerson(data: {
        name: string;
        email: string;
        role: "attendee" | "judge" | "guest";
        eventId: string;
    }) {
        const person = await this._personRepo.create({
            ...data,
            eventId: new Types.ObjectId(data.eventId),
        });

        if (!person) {
            throw new Error("Failed to create person");
        }

        // generate QR
        const qrPayload = JSON.stringify({
            personId: person._id,
            eventId: data.eventId,
            role: data.role,
        });

        const qrCode = await generateQRCode(qrPayload);
        const uploadRes = await uploadToCloudinary(qrCode);

        if (!uploadRes) {
            throw new Error("Failed to upload QR code");
        }

        const ticket = await this._ticketRepo.create({
            eventId: new Types.ObjectId(data.eventId),
            personId: person._id,
            qrCode: uploadRes,
        });
        const event = await this._eventRepo.findById(data.eventId); 

        await sendTicketEmail({
            to: person.email,
            name: person.name,
            role: person.role,
            eventTitle: event?.title || "Event",
            eventVenue: event?.venue || "Venue",
            eventDate: event?.date?.toString() || "",
            eventTime: new Date(event?.date || "").toLocaleTimeString() || "",
            qrCodeUrl: uploadRes,
        });

        return { 
            id: person._id.toString(),
            name: person.name,
            email: person.email,
            role: person.role as "attendee" | "judge" | "guest",
            createdAt: person?.createdAt || "",
            ticketStatus: ticket.status,
            ticketUrl: ticket.qrCode
        };
    }
    async getPersonByRole(role: "attendee" | "judge" | "guest", eventId: string) {
        const persons = await this._personRepo.findByRole(role, eventId);
        const resultData = Promise.all(
            persons.map(async (person) => {
                const ticket = await this._ticketRepo.findByPersonId(person._id.toString());
                return {
                    id: person._id.toString(),
                    name: person.name,
                    email: person.email,
                    role: person.role as "attendee" | "judge" | "guest",
                    createdAt: person?.createdAt || "",
                    ticketStatus: ticket?.status || "invalid",
                    ticketUrl: ticket?.qrCode || "",
                };
            })
        );
        return resultData;
    }
    async verifyTicket(eventId: string, personId: string) {
        const person = await this._personRepo.findByIdAndEventId(personId, eventId);
        if (!person) return { success: false, message: "Person not found for this event" };

        const ticket = await this._ticketRepo.findByPersonId(personId);
        console.log("ticket data",ticket,person)
        if (!ticket) return { success: false, message: "Ticket not found for this person" };

        if (ticket.status !== "valid") {
            return { success: false, message: "Ticket is already used or invalid", status: ticket.status };
        }

        const updatedTicket = await this._ticketRepo.updateStatus(personId, "used");
        return {
            success: true,
            message: "Ticket verified successfully",
            personName: person.name,
            role: person.role,
            eventId,
            ticketStatus: updatedTicket?.status,
            ticketUrl: updatedTicket?.qrCode,
        };

}
}
