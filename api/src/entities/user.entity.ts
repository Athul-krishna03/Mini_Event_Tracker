export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "participant" | "organizer";
    refreshToken?: string;
}