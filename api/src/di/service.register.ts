import { container } from "tsyringe";
import { IAuthService } from "../interfaces/serviceInterfaces/IAuthService";
import { AuthService } from "../services/authService";
import { EventService } from "../services/eventservice";
import { IEventService } from "../interfaces/serviceInterfaces/IEventService";
import { IPersonService } from "../interfaces/serviceInterfaces/IPersonService";
import { PersonService } from "../services/personService";

export class ServicesRegistery {
  static registerServices(): void {
    container.register<IAuthService>("IAuthService", {
      useClass: AuthService,
    }),
      container.register<IEventService>("IEventService", {
        useClass: EventService,
      });
    container.register<IPersonService>("IPersonService", {
      useClass: PersonService,
    });
  }
}
