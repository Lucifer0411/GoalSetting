import express from 'express'
import dotenv from 'dotenv'
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url'

connectDB();

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
dotenv.config();
const port=process.env.PORT

app.use('/api/goals',goalRouter)
app.use('/api/users',userRouter)
// app.use((req,res)=>{
//     res.status(404).json({message:"page not found"})
// })
// Serve frontend
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()+'/GoalSetting';
    // console.log(__dirname+'');
    
    app.use(express.static(path.join(__dirname,'../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname,'../','frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on ${port}`))