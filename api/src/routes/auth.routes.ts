import { Router ,Request,Response} from "express";
import asyncHandler from "express-async-handler";
import { authController } from "../di";

export class AuthRoutes{
    public router :Router;

    constructor(){
        this.router=Router();
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.post('/register', asyncHandler((req: Request, res: Response) => {
            authController.register(req, res);
        }))
        this.router.post('/login', asyncHandler((req: Request, res: Response) => {
            authController.login(req, res);
        }))
        this.router.post('/logout',(req:Request,res:Response)=>{
            authController.logoutUser(req,res)
        })
        this.router.post('/refresh-token',(req:Request,res:Response)=>{
            authController.getRefreshToken(req,res)
        })
    }
}
export default new AuthRoutes().router;