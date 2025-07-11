import express from "express";
import HomeSection from "../Models/HomePage.js"; 
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const section = await HomeSection.findOne(); 
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homepage content" });
  }
});

export default router;
