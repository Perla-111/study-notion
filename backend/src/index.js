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

const PORT = process.env.PORT || 3001;
const app = express();

const allowedOrigins = new Set([
  "https://study-notion-eta-one.vercel.app",
  "http://localhost:3000",
]);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients (no Origin header).
    // Some proxies/misconfigured clients send literal "undefined"/"null".
    if (!origin || origin === "undefined" || origin === "null") {
      return callback(null, true);
    }

    // Allow exact matches
    if (allowedOrigins.has(origin)) return callback(null, true);

    // Allow Vercel preview deployments for this app
    // e.g. https://study-notion-eta-one-git-branch-username.vercel.app
    if (/^https:\/\/study-notion-eta-one-.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Ensure preflight requests are answered for all routes
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  res.send("study notion application is running");
});

connectDB().then(() => {
  // Connecting to cloudinary
  cloudinaryConnect();
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
