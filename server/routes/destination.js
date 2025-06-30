import { Router } from "express";
import { createDestination, getAllDestinations, getDestinationById, updateDestination, deleteDestination, likeDestination, addComment} from "../controllers/destinationController.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import upload from "../middlewares/uploadFile.js";

const destinationRouter = Router();

destinationRouter.get("/destinations", getAllDestinations);

destinationRouter.get("/destinations/:id", getDestinationById);

destinationRouter.post("/destinations", verifyUser, upload.array("images", 5), createDestination);

destinationRouter.patch("/destinations/:id", verifyUser, updateDestination); 

destinationRouter.delete("/destinations/:id", verifyUser, deleteDestination); 

destinationRouter.patch("/destinations/:id/like", verifyUser, likeDestination);

destinationRouter.post("/destinations/:id/comment", verifyUser, addComment);

export default destinationRouter;