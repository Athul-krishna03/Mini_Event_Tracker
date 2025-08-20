// src/controllers/EventController.ts
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IEventService } from "../interfaces/serviceInterfaces/IEventService";
import { AuthRequest } from "../middleware/auth.middleware";
import mongoose from "mongoose";
import { createEventSchema } from "../utils/validation/eventDataValidation";

@injectable()
export class EventController {
    constructor(
        @inject("IEventService") private _eventService: IEventService
    ){}
    async getEvents(req: Request, res: Response) {
        const { status } = req.query;
        const userId = (req as AuthRequest).user.id;
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
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
            return res.status(400).json({ error: "Invalid userId" });
        }
        if (new Date(parsed.date) < new Date()) {
            return res.status(400).json({ error: "Event date must be in the future" });
        }

        const data = {
            ...parsed,
            date: new Date(parsed.date),
            createdBy: userId
        };

        const event = await this._eventService.createEvent(data);
        res.status(201).json(event);
    }
    async getEventById(req:Request,res:Response){
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid event ID" });
        }

        const event = await this._eventService.getEventById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(event);
    }
}
