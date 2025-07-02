import {Router} from 'express';
import { createUser, loginUser, logoutUser, refreshToken } from '../controllers/authController.js';
import { uploadProfileImage } from "../middlewares/uploadFile.js";


const authRouter = Router();

authRouter.post('/register', uploadProfileImage.single('profile_picture'), createUser);

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser);

authRouter.post('/refresh-token', refreshToken);

export default authRouter;