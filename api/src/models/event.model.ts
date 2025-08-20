// models/EventModel.ts
import { Schema, model } from "mongoose";
import { IEvent } from "../entities/event.entity";

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    venue:{type:String,required:true},
    capacity: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    programs: [{ type:String}],
  },
  { timestamps: true }
);

export const EventModel = model<IEvent>("Event", eventSchema);
