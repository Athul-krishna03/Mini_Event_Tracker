// src/services/EventService.ts
import { inject, injectable } from "tsyringe";
import { IEventRepository } from "../interfaces/repositoryInterfaces/IEventRepository";
import { IEventService } from "../interfaces/serviceInterfaces/IEventService";
import { IEvent } from "../entities/event.entity";

@injectable()
export class EventService implements IEventService { 
    constructor(
        @inject("IEventRepository") private _repo:IEventRepository
    ) {}

    async getEventsByStatus(status: "upcoming" | "ongoing" | "past",userId: string){
        return this._repo.findByStatus(status,userId);
    }

    async createEvent(data: Partial<IEvent>) {
        return this._repo.create(data);
    }

    async getEventById(id:string) {
        return this._repo.findById(id);
    }
}
