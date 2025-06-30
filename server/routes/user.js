import {Router} from 'express'
import { getUserProfile, getAllUsers, getUsersByID} from '../controllers/userController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const userRouter = Router();

userRouter.get('/profile', verifyUser, getUserProfile)

userRouter.get('/users', getAllUsers)

userRouter.get('/user/:id', getUsersByID)


export default userRouter;