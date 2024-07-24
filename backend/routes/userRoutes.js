import express from 'express'
import { registerUser,getMe, loginUser } from '../controllers/user-controller.js';
import protect from '../middleware/authMiddleware.js';

export const userRouter=express.Router();

userRouter.post('/',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/me',protect,getMe)

export default userRouter

