import { Schema, model } from "mongoose";
import { IUser } from "../entities/user.entity";



const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["attendee", "organizer"], required: true },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
