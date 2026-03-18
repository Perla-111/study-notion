import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import { cloudinaryConnect } from "./config/cloudinary.js";
import { connectDB } from "./config/database.js";

import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import courseRoutes from "./routes/course.js";
import paymentRoutes from "./routes/payments.js";
import contactUsRoute from "./routes/contact.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: false,
  }),
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  res.send("study notion application is running");
});

app.listen(PORT, () => {
  // console.log(`server is running on port ${PORT}`);
});
