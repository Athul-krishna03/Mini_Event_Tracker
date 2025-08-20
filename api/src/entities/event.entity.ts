import { Types } from "mongoose";

export interface IEvent {
    id: string;
    title: string;
    venue:string;
    description: string;
    date: Date;
    createdBy: Types.ObjectId | string;
    capacity: number;
    // tickets: number;
    programs: string[];
}