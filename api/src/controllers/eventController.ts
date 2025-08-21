// src/controllers/EventController.ts
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IEventService } from "../interfaces/serviceInterfaces/IEventService";
import { AuthRequest } from "../middleware/auth.middleware";
import mongoose from "mongoose";
import { createEventSchema } from "../utils/validation/eventDataValidation";
import { STATUS_CODE } from "../constants/statusCodes";
import { ERROR_MESSAGES } from "../constants/messages";

@injectable()
export class EventController {
    constructor(
        @inject("IEventService") private _eventService: IEventService
    ){}
    async getEvents(req: Request, res: Response) {
        const { status } = req.query;
        const userId = (req as AuthRequest).user.id;
        if (!status) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Status is required" });
        }

        const events = await this._eventService.getEventsByStatus(
            status as "upcoming" | "ongoing" | "past", userId
        );

        res.json({
            events,
            totalEvents: events.length,
        });
    }
    async createEvent(req: Request, res: Response) {
        const parsed = createEventSchema.parse(req.body);
        const userId = (req as AuthRequest).user.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ error: ERROR_MESSAGES.USER_ID_NOT_PROVIDED });
        }
        if (new Date(parsed.date) < new Date()) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ error: ERROR_MESSAGES.EVENT_DATE_IN_PAST });
        }

        const data = {
            ...parsed,
            date: new Date(parsed.date),
            createdBy: userId
        };

        const event = await this._eventService.createEvent(data);
        res.status(STATUS_CODE.CREATED).json(event);
    }
    async getEventById(req:Request,res:Response){
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ error: ERROR_MESSAGES.INVALID_INPUT });
        }

        const event = await this._eventService.getEventById(id);
        if (!event) {
            return res.status(STATUS_CODE.NOT_FOUND).json({ error: ERROR_MESSAGES.EVENT_NOT_FOUND });
        }

        res.json(event);
    }
}
