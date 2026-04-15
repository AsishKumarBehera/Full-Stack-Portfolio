import express from "express";
import Portfolio from "../models/Portfolio.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

// SAVE DATA
router.post("/save", upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "projectImage_0", maxCount: 1 },
  { name: "projectImage_1", maxCount: 1 },
  { name: "projectImage_2", maxCount: 1 },
]), async (req, res) => {
  try {
    const projects = JSON.parse(req.body.projects).map((proj, i) => ({
      ...proj,
      image: req.files[`projectImage_${i}`]?.[0]?.path || null,
    }));

    const data = {
      ...req.body,
      technologies: JSON.parse(req.body.technologies),
      projects,
      photo: req.files["photo"]?.[0]?.path || null,
    };

    const newPortfolio = new Portfolio(data);
    await newPortfolio.save();

    res.status(200).json({ message: "Saved successfully", id: newPortfolio._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET DATA BY ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Portfolio.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL DATA
router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;