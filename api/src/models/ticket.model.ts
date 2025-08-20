import { model, Schema } from "mongoose";
import { ITicket } from "../entities/ticket.entity";


const ticketSchema = new Schema<ITicket>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    personId: { type: Schema.Types.ObjectId, ref: "Person", required: true },
    qrCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["valid", "used", "invalid"],
      default: "valid",
    },
  },
  { timestamps: true }
);

export const Ticket = model<ITicket>("Ticket", ticketSchema);
