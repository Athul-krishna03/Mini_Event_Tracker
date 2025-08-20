import { IPerson } from "../../entities/person.entity";


export interface IPersonRepository {
    create(person: Partial<IPerson>): Promise<IPerson>;
    findByEvent(eventId: string): Promise<IPerson[]>;
    findByRole(role: "attendee" | "judge" | "guest", eventId: string): Promise<IPerson[]>;  
    findByIdAndEventId(personId: string, eventId: string): Promise<IPerson | null>;
}
