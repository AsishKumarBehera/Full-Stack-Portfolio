import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST API
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: "Message saved successfully ✅" });

  } catch (error) {
    res.status(500).json({ message: "Error saving message ❌" });
  }
});

// GET API (optional)
router.get("/", async (req, res) => {
  const data = await Contact.find();
  res.json(data);
});

export default router;