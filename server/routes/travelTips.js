import { Router } from "express";
import {
  createTravelTip,
  getAllTravelTips,
  getTravelTipById,
  updateTravelTip,
  deleteTravelTip,
  likeTravelTip,
  addCommentToTravelTip,
} from "../controllers/travelTipController.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const travelTipRouter = Router();

travelTipRouter.get("/travel-tips", getAllTravelTips);
travelTipRouter.get("/travel-tips/:id", getTravelTipById);
travelTipRouter.post("/travel-tips", verifyUser, createTravelTip);
travelTipRouter.patch("/travel-tips/:id", verifyUser, updateTravelTip);
travelTipRouter.delete("/travel-tips/:id", verifyUser, deleteTravelTip);
travelTipRouter.patch("/travel-tips/:id/like", verifyUser, likeTravelTip);
travelTipRouter.post("/travel-tips/:id/comment", verifyUser, addCommentToTravelTip);

export default travelTipRouter;
