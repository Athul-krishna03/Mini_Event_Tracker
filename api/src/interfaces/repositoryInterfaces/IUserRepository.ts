import { IUser } from "../../entities/user.entity";

export interface IUserRepository {
    findById(userId: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
    update(id: string, user: Partial<IUser>): Promise<IUser | null>;
}