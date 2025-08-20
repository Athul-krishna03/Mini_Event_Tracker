import { container } from "tsyringe";
import { IUserRepository } from "../interfaces/repositoryInterfaces/IUserRepository";
import { UserRepository } from "../repository/UserRepository";
import { EventRepository } from "../repository/EventRepository";
import { IEventRepository } from "../interfaces/repositoryInterfaces/IEventRepository";
import { PersonRepository } from "../repository/PersonRepository";
import { IPersonRepository } from "../interfaces/repositoryInterfaces/IPersonRepository";
import { ITicketRepository } from "../interfaces/repositoryInterfaces/ITicketRepository";
import { TicketRepository } from "../repository/TicketRepository";

export class RepositoryRegistry {
    static registerRepositories(): void {
        container.register<IUserRepository>("IUserRepository", { 
            useClass: UserRepository 
        });
        container.register<IEventRepository>("IEventRepository", {
            useClass: EventRepository
        });
        container.register<IPersonRepository>("IPersonRepository", {
            useClass: PersonRepository
        });
        container.register<ITicketRepository>("ITicketRepository", {
            useClass: TicketRepository
        });
    }
}