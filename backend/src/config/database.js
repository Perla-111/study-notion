import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      serverSelectionTimeoutMS: 10_000,
    });
    console.log("connected to database");
  } catch (error) {
    //console.log('error connecting to database');
    process.exit(1);
  }
};
