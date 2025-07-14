
import express from "express";
import Contact from "../Models/contactUs.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, email, mobile, comment } = req.body;

    const contact = new Contact({
      name,
      email,
      mobile,
      comment,
    });

    await contact.save();

    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
