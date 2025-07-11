import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import homeRoutes from "./Routes/home.js";
import aboutRoutes from "./Routes/about.js";
import serviceRoutes from './Routes/service.js'


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/service", serviceRoutes);


app.listen(PORT, () => console.log("Server running on port 3000"));
