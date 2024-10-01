import { User } from "../models/userModel.js"
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser=asyncHandler(async(req,res)=>{
    const {name, password, email}=req.body;
    if(!name || !password || !email){
        res.status(404)
        throw new Error("please enter all the fields")
    }
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }
    //handle bcrypt for generating encrypted password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})


export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!password || !email){
        res.status(404)
        throw new Error("Please enter all the fields")
    }

    const userExists=await User.findOne({email});
    
    if(userExists && (await bcrypt.compare(password,userExists.password))){
        res.status(201).json({
            _id:userExists.id,
            name:userExists.name,
            email:userExists.email,
            token:generateToken(userExists._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
    

})


export const getMe=asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)

})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
