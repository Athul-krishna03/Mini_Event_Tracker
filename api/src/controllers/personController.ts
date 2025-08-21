import e, { Request, Response } from "express";
    
import { inject, injectable } from "tsyringe";
import { IPersonService } from "../interfaces/serviceInterfaces/IPersonService";
import { Types } from "mongoose";
import { STATUS_CODE } from "../constants/statusCodes";
import { ERROR_MESSAGES } from "../constants/messages";

@injectable()
export class PersonController {
    constructor(
        @inject("IPersonService") private _personService: IPersonService
    ) {}

    async addPerson(req: Request, res: Response) {
        const { name, email, role, eventId } = req.body;
        console.log(name,email,role,eventId)
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error(ERROR_MESSAGES.INVALID_INPUT);
        }
        const result = await this._personService.addPerson({
        name,
        email,
        role,
        eventId,
        });

        res.status(STATUS_CODE.CREATED).json(result);
    }
    async getPersonByRole(req: Request, res: Response) {
        const { role , eventId } = req.query as { role: "attendee" | "judge" | "guest"; eventId: string };
        console.log("role",role,eventId)
        const result = await this._personService.getPersonByRole(role , eventId);
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }
        res.status(STATUS_CODE.OK).json(result);
    }
    async verifyTicket(req: Request, res: Response) {
        const { eventId, personId } = req.body;
        console.log("eventId",eventId,"personId",personId)
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error(ERROR_MESSAGES.INVALID_INPUT);
        }
        if (!personId || !Types.ObjectId.isValid(personId)) {
            throw new Error(ERROR_MESSAGES.INVALID_INPUT);
        }

        const result = await this._personService.verifyTicket(eventId, personId);
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).json({ message: ERROR_MESSAGES.TICKET_NOT_FOUND });
        }
        res.status(STATUS_CODE.OK).json(result);
    }
}
