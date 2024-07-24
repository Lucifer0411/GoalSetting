import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name']
    },
    password:{
        type:String,
        required:[true,'Please enter an password']
    },
    email:{
        type:String,
        required:[true,'Please enter a email'],
        unique:true
    },
},{
    timestamps:true
})

export const User=mongoose.model('User',userSchema);