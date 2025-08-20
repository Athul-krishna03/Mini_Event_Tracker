import "reflect-metadata"
import express , {Request,Response,NextFunction} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import privateRoutes from "./routes/private.routes";
import { connectDB } from "./config/database";
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);
app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    res.status(500).json({ error: err.message || "Internal Server Error" });
});
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
