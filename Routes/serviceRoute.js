import express from "express";
import ServicePage from "../Models/servicePage.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = await ServicePage.findOne();
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
