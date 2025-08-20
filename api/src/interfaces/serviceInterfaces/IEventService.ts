import { IEvent } from "../../entities/event.entity";


export interface IEventService{
    getEventsByStatus(status: "upcoming" | "ongoing" | "past", userId: string): Promise<IEvent[]>;
    createEvent(data: Partial<IEvent>): Promise<IEvent>;
    getEventById(id: string): Promise<IEvent | null>;
}   