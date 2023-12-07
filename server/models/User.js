import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    amount:{
        type:Number
    },
    no_of_trees:{
        type:Number
    }   
})

export const User=mongoose.model("User",userSchema);