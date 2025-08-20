import { Types } from "mongoose";
import { PersonRole } from "../models/person.model";

export interface IPerson {
    _id:string | Types.ObjectId;
    name: string;
    email: string;
    role: PersonRole;
    eventId: Types.ObjectId | string;
    createdAt?: string;
}