import {Router} from 'express'
import { getUserProfile, getAllUsers, getUsersByID, updateUserProfile} from '../controllers/userController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const userRouter = Router();

userRouter.get('/profile', verifyUser, getUserProfile)

userRouter.patch('/profile', verifyUser, updateUserProfile)

userRouter.get('/users', getAllUsers)

userRouter.get('/user/:id', getUsersByID)


export default userRouter;