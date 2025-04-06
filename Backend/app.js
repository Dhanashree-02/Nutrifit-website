import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Load env variables
config({ path: "./config/config.env" });

// ✅ CORS setup - allows both patient and admin frontend ports
app.use(
  cors({
    origin: [process.env.FRONTEND_PATIENT, process.env.FRONTEND_ADMIN],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Database connection
dbConnection();

// Global error handler
app.use(errorMiddleware);

export default app;
