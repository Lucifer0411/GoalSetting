import express from 'express'
import { getGoals,setGoal,deleteGoal, updateGoal } from '../controllers/goal-controller.js';
import protect from '../middleware/authMiddleware.js';
const goalRouter=express.Router();

// router.get('/',getGoals)
// router.post('/',setGoal)
goalRouter.route('/').get(protect,getGoals).post(protect,setGoal)   

// router.put('/:id',updateGoal)
// router.delete('/:id',deleteGoal)
goalRouter.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

goalRouter.use((req,res)=>{
    res.status(404).json({message:"page not found"})
})


export default goalRouter