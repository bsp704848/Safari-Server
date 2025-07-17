import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./Routes/authRoute.js";
import homeRoute from "./Routes/homeRoute.js";
import aboutRoute from "./Routes/aboutRoute.js";
import serviceRoute from './Routes/serviceRoute.js'
import contactRoute from './Routes/contactRoute.js'


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

app.use('/api/auth', authRoute);
app.use("/api/home", homeRoute);
app.use("/api/about", aboutRoute);
app.use("/api/service", serviceRoute);
app.use("/api/contact", contactRoute);



app.listen(PORT, () => console.log("Server running on port 3000"));
