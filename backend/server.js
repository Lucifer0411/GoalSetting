import express from 'express'
import dotenv from 'dotenv'
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors'

connectDB();

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
dotenv.config();
const port=process.env.PORT

app.use('/api/goals',goalRouter)
app.use('/api/users',userRouter)
app.use((req,res)=>{
    res.status(404).json({message:"page not found"})
})

app.use(errorHandler)

app.listen(port,()=>console.log(`server started on ${port}`))