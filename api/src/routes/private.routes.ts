import { Router,Request,Response } from "express";
import asyncHandler from "express-async-handler";
import { eventController, personController } from "../di";
import { authMiddleware } from "../middleware/auth.middleware";

export class PrivateRoutes{
    public router :Router;

    constructor(){
        this.router=Router();
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.post('/addEvent',authMiddleware,asyncHandler( (req:Request, res:Response) => {
            eventController.createEvent(req,res)
        }));
        this.router.get('/events', authMiddleware,asyncHandler( (req:Request, res:Response) => {
            eventController.getEvents(req,res)
        }));
        this.router.get('/getevent/:id', authMiddleware, asyncHandler((req: Request, res: Response) => {
            eventController.getEventById(req, res);
        }));
        this.router.post('/addPerson',authMiddleware,asyncHandler(async (req, res) => {
            personController.addPerson(req, res);
        }));
        this.router.get('/getPerson', authMiddleware, asyncHandler((req: Request, res: Response) => {
            personController.getPersonByRole(req, res);
        }));
        this.router.patch('/verifyTicket',authMiddleware,asyncHandler( (req:Request, res:Response) => {
            personController.verifyTicket(req,res);
        }));

    }
}

export default new PrivateRoutes().router;