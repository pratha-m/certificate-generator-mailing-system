import mongoose from "mongoose";

export const connectDB=async()=>{
   try{
     mongoose.connect(process.env.MONGO_URL);
     console.log("Database connected");
   }
   catch(error){
    console.log("Database connection not succeded");
   }
}