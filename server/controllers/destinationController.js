import Destination from "../model/Destination.js";
import { getCoordinatesForLocation } from "../utils/geocoding.js";

export const createDestination = async (req, res) => {
  try {
    const { name, description, tags, address, city, country } = req.body;
    if (!name || !description || !tags || !city || !country || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const coordinates = await getCoordinatesForLocation(country, city, address);
    const location = {
      type: "Point",
      coordinates: coordinates,
    };

    const imagePaths = req.files?.map((file) => file.path) || [];

    const newDestination = new Destination({
      name,
      description,
      images: imagePaths,
      location,
      tags: Array.isArray(tags) ? tags : JSON.parse(tags),
      address: address.trim(),
      city: city.trim(),
      country: country.trim(),
      created_by: req.userId,
    });

    await newDestination.save();

    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Create Destination Error:", error);
    res.status(500).json({ message: "Failed to create destination" });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate("created_by", "first_name last_name")
      .sort({ created_at: -1 });
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Get All Destinations Error:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate("created_by", "first_name last_name")
      .populate("comments.user", "first_name last_name");

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (error) {
    console.error("Get Destination Error:", error);
    res.status(500).json({ message: "Failed to fetch destination" });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const { name, description, tags, address, city, country } = req.body || {};

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    if (name) destination.name = name.trim();
    if (description) destination.description = description.trim();
    if (tags) destination.tags = Array.isArray(tags) ? tags : JSON.parse(tags);
    if (address) destination.address = address.trim();
    if (city) destination.city = city.trim();
    if (country) destination.country = country.trim();

    if (address || city || country) {
      const coordinates = await getCoordinatesForLocation(
        country || destination.country,
        city || destination.city,
        address || destination.address
      );
      destination.location = {
        type: "Point",
        coordinates: coordinates,
      };
    }

    await destination.save();

    res.status(200).json({
      message: "Destination updated successfully",
      destination,
    });
  } catch (error) {
    console.error("Update Destination Error:", error);
    res.status(500).json({ message: "Failed to update destination" });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    await Destination.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Delete Destination Error:", error);
    res.status(500).json({ message: "Failed to delete destination" });
  }
};

export const likeDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const alreadyLiked = destination.likes.includes(req.userId);
    if (alreadyLiked) {
      destination.likes.pull(req.userId);
    } else {
      destination.likes.push(req.userId);
    }

    await destination.save();

    res.status(200).json({
      message: alreadyLiked ? "Unliked successfully" : "Liked successfully",
      likes: destination.likes.length,
    });
  } catch (error) {
    console.error("Like Destination Error:", error);
    res.status(500).json({ message: "Failed to update like" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!comment) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    destination.comments.push({
      user: req.userId,
      comment,
      date: new Date(),
    });

    await destination.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: destination.comments,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
