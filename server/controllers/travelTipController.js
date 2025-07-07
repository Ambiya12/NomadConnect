import TravelTip from "../model/TravelTip.js";

export const createTravelTip = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newTip = new TravelTip({
      title: title.trim(),
      description: description.trim(),
      created_by: req.userId,
    });

    await newTip.save();

    res.status(201).json({ message: "Travel tip created successfully", tip: newTip });
  } catch (error) {
    console.error("Create Travel Tip Error:", error);
    res.status(500).json({ message: "Failed to create travel tip" });
  }
};

export const getAllTravelTips = async (req, res) => {
  try {
    const tips = await TravelTip.find()
      .populate("created_by", "first_name last_name")
      .sort({ createdAt: -1 });

    res.status(200).json(tips);
  } catch (error) {
    console.error("Get All Travel Tips Error:", error);
    res.status(500).json({ message: "Failed to fetch travel tips" });
  }
};

export const getTravelTipById = async (req, res) => {
  try {
    const tip = await TravelTip.findById(req.params.id)
      .populate("created_by", "first_name last_name")
      .populate("comments.user", "first_name last_name");

    if (!tip) return res.status(404).json({ message: "Travel tip not found" });

    res.status(200).json(tip);
  } catch (error) {
    console.error("Get Travel Tip Error:", error);
    res.status(500).json({ message: "Failed to fetch travel tip" });
  }
};

export const updateTravelTip = async (req, res) => {
  try {
    const { title, description } = req.body;

    const tip = await TravelTip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Travel tip not found" });

    if (title) tip.title = title.trim();
    if (description) tip.description = description.trim();

    await tip.save();

    res.status(200).json({ message: "Travel tip updated successfully", tip });
  } catch (error) {
    console.error("Update Travel Tip Error:", error);
    res.status(500).json({ message: "Failed to update travel tip" });
  }
};

export const deleteTravelTip = async (req, res) => {
  try {
    const tip = await TravelTip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Travel tip not found" });

    await TravelTip.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Travel tip deleted successfully" });
  } catch (error) {
    console.error("Delete Travel Tip Error:", error);
    res.status(500).json({ message: "Failed to delete travel tip" });
  }
};

export const likeTravelTip = async (req, res) => {
  try {
    const tip = await TravelTip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Travel tip not found" });

    const alreadyLiked = tip.likes.includes(req.userId);

    if (alreadyLiked) {
      tip.likes.pull(req.userId);
    } else {
      tip.likes.push(req.userId);
    }

    await tip.save();

    res.status(200).json({
      message: alreadyLiked ? "Unliked successfully" : "Liked successfully",
      likes: tip.likes.length,
    });
  } catch (error) {
    console.error("Like Travel Tip Error:", error);
    res.status(500).json({ message: "Failed to update like" });
  }
};

export const addCommentToTravelTip = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!req.userId) return res.status(401).json({ message: "User not authenticated" });
    if (!comment) return res.status(400).json({ message: "Comment cannot be empty" });

    const tip = await TravelTip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Travel tip not found" });

    tip.comments.push({
      user: req.userId,
      comment: comment.trim(),
      date: new Date(),
    });

    await tip.save();

    res.status(201).json({ message: "Comment added successfully", comments: tip.comments });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
