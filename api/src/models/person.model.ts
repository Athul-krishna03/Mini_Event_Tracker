import { model, Schema, Types } from "mongoose";

export type PersonRole = "attendee" | "judge" | "guest";

export interface IPerson extends Document {
    name: string;
    email: string;
    role: PersonRole;
    eventId: Types.ObjectId | string;
}

const PersonSchema = new Schema<IPerson>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, enum: ["attendee", "judge", "guest"], required: true },
        eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    },
    { timestamps: true }
);

export const Person = model<IPerson>("Person", PersonSchema);
