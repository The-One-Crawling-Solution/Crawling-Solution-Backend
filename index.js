import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongoConnection.js";
import cors from "cors";
import blogRoutes from "./route/blogRoute.js";
import uploadRouter from "./route/uploadRouter.js";
import userRoutes from "./route/userRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", blogRoutes);
app.use("/api", uploadRouter);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
