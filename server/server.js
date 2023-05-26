import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// connect db
connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
