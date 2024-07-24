import asyncHandler from "express-async-handler";
import { Goal } from "../models/goalModel.js";
import { User } from "../models/userModel.js";

export const getGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.find({user:req.user.id})
    res.json(goal);
})

export const setGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a new text")
    }
        // const goal=new Goal(req.body)
        // await goal.save();
        const goal=await Goal.create({
            text:req.body.text,
            user:req.user.id
        })
        res.status(200).json(goal)
})
export const updateGoal=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const goal=await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error("Goal does not exists")
    }
    //check to user exists
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //check user deletes only his goals
    if(req.user.id!==goal.user.toString()){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal=await Goal.findByIdAndUpdate(id,req.body,{new: true})
    // const updatedGoal=await Goal.updateOne({_id:id},req.body)

    res.json({message:`update goal ${updatedGoal}`});
})
export const deleteGoal=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const goal=await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error("Goal does not exists")
    }
        //check to user exists
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }
        //check user deletes only his goals
        if(req.user.id!==goal.user.toString()){
            res.status(401)
            throw new Error('User not authorized')
        }
    await Goal.deleteOne(goal);

    // res.status(201).json(id);
    res.status(200).json({ id: req.params.id })
})
