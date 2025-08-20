// src/repositories/EventRepo.ts
import { EventModel } from "../models/event.model";
import { IEvent } from "../entities/event.entity";
import { IEventRepository } from "../interfaces/repositoryInterfaces/IEventRepository";
import { injectable } from "tsyringe";

@injectable()
export class EventRepository  implements IEventRepository {
    async findByStatus(status: "upcoming" | "ongoing" | "past",userId: string) {
        const now = new Date();

        if (status === "upcoming") {
        return EventModel.find({ date: { $gt: now }, createdBy: userId }).sort({ date: 1 });
        }
        if (status === "ongoing") {
        return EventModel.find({
            startDate: { $lte: now },
            endDate: { $gte: now },
        }).sort({ startDate: 1 });
        }
        if (status === "past") {
        return EventModel.find({ endDate: { $lt: now } }).sort({ endDate: -1 });
        }

        return [];
    }

    async create(event: Partial<IEvent>) {
        const newEvent = new EventModel(event);
        return newEvent.save();
    }

    async findById(id: string) {
        return EventModel.findById(id);
    }
}