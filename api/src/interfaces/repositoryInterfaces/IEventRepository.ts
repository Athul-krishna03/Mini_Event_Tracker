import { IEvent } from "../../entities/event.entity";


export interface IEventRepository{
    findByStatus(status: "upcoming" | "ongoing" | "past", userId: string): Promise<IEvent[]>;
    create(event: Partial<IEvent>): Promise<IEvent>;
    findById(id: string): Promise<IEvent | null>;
}