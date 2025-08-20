// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IAuthService } from '../interfaces/serviceInterfaces/IAuthService';
import { AuthRequest } from '../middleware/auth.middleware';
import { setCookies } from '../utils/helpers/setCookie.helper';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/messages';
import { STATUS_CODE } from '../constants/statusCodes';
import { verifyAccessToken } from '../utils/jwt.service';



@injectable()
export class AuthController {
    constructor(
        @inject("IAuthService") private authService:IAuthService,
    ) {}

    async register(req: Request, res: Response) {
        console.log(req.body)
        const user = await this.authService.register(req.body);
        res.status(STATUS_CODE.CREATED).json(user);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        if (!result) return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
        setCookies(res,result.access_token,result.refresh_token)
        res.json({ user: result.user });
    }

    async logoutUser(req: Request, res: Response){
        res.clearCookie("x-access-token");
        res.clearCookie("x-refresh-token");
        res.status(STATUS_CODE.OK).json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
    }

    async getRefreshToken(req: Request, res: Response){
        console.log(req.cookies);
        
        const accessToken = req.cookies["x-access-token"];
        const refreshToken = req.cookies["x-refresh-token"];

        if (!refreshToken) {
            throw new Error(ERROR_MESSAGES.TOKEN_MISSING);
        }
        let shouldRefresh = false;
        try {
            verifyAccessToken(accessToken);
            res.status(STATUS_CODE.OK).json({
            success: true,
            message: SUCCESS_MESSAGES.TOKEN_VALID,
            });
            return;
        } catch (err: any) {
            if (err.name === "TokenExpiredError") {
            shouldRefresh = true;
            } else {
            throw new Error(
                ERROR_MESSAGES.TOKEN_INVALID
            );
            }
        }
        if(shouldRefresh){
            const {newAccessToken, newRefreshToken}=await this.authService.refreshTokenVerify(refreshToken,accessToken)
            setCookies(res, newAccessToken, newRefreshToken);
            res.status(STATUS_CODE.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.SESSION_RENEWED,
            })
        }
        
    }
}