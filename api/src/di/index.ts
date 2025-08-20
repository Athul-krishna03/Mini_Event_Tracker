import { container } from "tsyringe";
import { RepositoryRegistry } from "./repository.register";
import { ServicesRegistery } from "./service.register";
import { AuthController } from "../controllers/authController";
import { EventController } from "../controllers/eventController";
import { PersonController } from "../controllers/personController";



export class DependencyInjection {
    static registerAll(): void {
        RepositoryRegistry.registerRepositories();
        ServicesRegistery.registerServices();
    }
}


DependencyInjection.registerAll()
export const authController = container.resolve(AuthController);
export const eventController = container.resolve(EventController);
export const personController = container.resolve(PersonController);