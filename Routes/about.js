import express from "express";
import AboutPage from "../Models/aboutPage.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = await AboutPage.findOne();
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch about page data." });
  }
});

export default router;
