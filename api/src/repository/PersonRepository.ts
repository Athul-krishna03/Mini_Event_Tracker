
import { injectable } from "tsyringe";
import { IPersonRepository } from "../interfaces/repositoryInterfaces/IPersonRepository";
import { Person} from "../models/person.model";
import { IPerson } from "../entities/person.entity";

@injectable()   
export class PersonRepository implements IPersonRepository {
    async create(person: Partial<IPerson>) {
        const newPerson = new Person(person);
        return newPerson.save();
    }

    async findByEvent(eventId: string) {
        return Person.find({ eventId });
    }
    async findByRole(role: "attendee" | "judge" | "guest", eventId: string) {
        return Person.find({ role, eventId });
    }
    async findByIdAndEventId(personId: string, eventId: string) {
        return Person.findOne({ _id: personId, eventId });
    }
}