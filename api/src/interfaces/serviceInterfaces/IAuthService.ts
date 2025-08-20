import { IUser } from "../../entities/user.entity";

export interface IAuthService {
    register(user: IUser): Promise<IUser>;
    login(
        email: string,
        password: string
    ): Promise<{ user: IUser; access_token: string ,refresh_token:string} | null>;
    updateProfile(id: string, updates: Partial<IUser>): Promise<IUser | null>;
    refreshTokenVerify(refresh: string, access: string): Promise<{ newAccessToken: string; newRefreshToken: string }>;
}