import express from "express";
import { getCoordinatesForLocation } from "../utils/geocoding.js";

const router = express.Router();

router.get("/geocode", async (req, res) => {
  const { country, city } = req.query;

  if (!country || !city) {
    return res.status(400).json({ message: "Country and city are required" });
  }

  try {
    const coordinates = await getCoordinatesForLocation(country, city);
    res.status(200).json({ coordinates });
  } catch (error) {
    console.error("Geocoding error:", error);
    res.status(500).json({ message: "Failed to fetch coordinates" });
  }
});

export default router;