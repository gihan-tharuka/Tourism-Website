import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import destinationRoutes from "./routes/destination.routes";
import testimonialRoutes from "./routes/testimonial.routes";
import tourRoutes from "./routes/tour.routes";
import transferRoutes from "./routes/transfer.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

app.use("/api/tours", tourRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/transfers", transferRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Beyond Sea Travels API running on port ${port}`);
});
