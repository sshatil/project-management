import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// import bodyParser from "body-parser";

dotenv.config();

// connect db
connectDB();

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/project", projectRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
