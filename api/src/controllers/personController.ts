import e, { Request, Response } from "express";
    
import { inject, injectable } from "tsyringe";
import { IPersonService } from "../interfaces/serviceInterfaces/IPersonService";
import { Types } from "mongoose";

@injectable()
export class PersonController {
    constructor(
        @inject("IPersonService") private _personService: IPersonService
    ) {}

    async addPerson(req: Request, res: Response) {
        const { name, email, role, eventId } = req.body;
        console.log(name,email,role,eventId)
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error("Invalid or missing eventId");
        }
        const result = await this._personService.addPerson({
        name,
        email,
        role,
        eventId,
        });

        res.status(201).json(result);
    }
    async getPersonByRole(req: Request, res: Response) {
        const { role , eventId } = req.query as { role: "attendee" | "judge" | "guest"; eventId: string };
        console.log("role",role,eventId)
        const result = await this._personService.getPersonByRole(role , eventId);
        if (!result) {
            return res.status(404).json({ message: "Person not found" });
        }
        res.status(200).json(result);
    }
    async verifyTicket(req: Request, res: Response) {
        const { eventId, personId } = req.body;
        console.log("eventId",eventId,"personId",personId)
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error("Invalid or missing eventId");
        }
        if (!personId || !Types.ObjectId.isValid(personId)) {
            throw new Error("Invalid or missing personId");
        }

        const result = await this._personService.verifyTicket(eventId, personId);
        if (!result) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(result);
    }
}
