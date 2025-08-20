import { IUser } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/repositoryInterfaces/IUserRepository";
import { UserModel } from "../models/user.model";

export class UserRepository  implements IUserRepository {
    async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        }).lean<IUser>().exec();
        return updatedUser;
    }
    async create(user: IUser): Promise<IUser> {
        const createdUser = new UserModel(user);
        const saved = await createdUser.save();
        return saved.toObject();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email }).lean<IUser>().exec();
    }

    async findById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id).lean<IUser>().exec();
    }
}
