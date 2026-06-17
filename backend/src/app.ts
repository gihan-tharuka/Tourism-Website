import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { swaggerSpec, swaggerUiServe, swaggerUiSetup } from "./docs/swagger";
import authRoutes from "./routes/auth.routes";
import destinationRoutes from "./routes/destination.routes";
import inquiryRoutes from "./routes/inquiry.routes";
import searchRoutes from "./routes/search.routes";
import testimonialRoutes from "./routes/testimonial.routes";
import tourRoutes from "./routes/tour.routes";
import transferRoutes from "./routes/transfer.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

app.get("/api/docs.json", (_req: Request, res: Response) => {
  res.status(200).json(swaggerSpec);
});

app.use("/api/docs", swaggerUiServe, swaggerUiSetup);

app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/search", searchRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
