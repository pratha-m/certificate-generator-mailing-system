import { User } from "../models/User.js"

export const findByEmail=async(email)=>{
    return await User.findOne({email:email});
}
export const findByPhone=async(phone)=>{
    return await User.findOne({phone:phone});
}
export const findAllUsers=async()=>{
    return await User.find({});
}
export const createUserService=async(userData)=>{
    return await User.create(userData)
}