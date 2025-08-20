import { Types } from "mongoose";

export interface ITicket {
    _id: Types.ObjectId | string;
    personId: Types.ObjectId | string;
    eventId: Types.ObjectId | string;
    qrCode: string;
    status: string;
    foodCouponId?: string;
}