import {Router} from 'express';
import { createUser, loginUser, logoutUser, refreshToken } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', createUser)

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser);

authRouter.post('/refresh-token', refreshToken);

export default authRouter;