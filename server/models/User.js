import {mongoose} from "../packages/packages.js";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    phone:{
        type:String,
        unique:true,
        required:true,
        index:true
    },
    amount:{
        type:Number
    },
    no_of_trees:{
        type:Number
    }   
})

export const User=mongoose.model("User",userSchema);