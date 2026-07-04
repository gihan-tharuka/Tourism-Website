import mongoose from "mongoose";

export const isMongoLoggingEnabled = () => {
  return process.env.MONGODB_LOGGING_ENABLED === "true" && Boolean(process.env.MONGODB_URI);
};

export const connectMongoDB = async () => {
  if (!isMongoLoggingEnabled()) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB activity logging connected");
  } catch (error) {
    console.warn("MongoDB activity logging unavailable. Continuing without audit logging.");
    if (process.env.NODE_ENV === "development") {
      console.warn(error);
    }
  }
};
