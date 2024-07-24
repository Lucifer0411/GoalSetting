import mongoose from "mongoose";

const goalSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'please add a user'],
        ref:'User'
    },
    text:{
        type:String,
        required:[true,'please add a text value']
    }
},{
    timestamps:true
})

export const Goal= mongoose.model('goals',goalSchema);

