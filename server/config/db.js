import {mongoose} from "../packages/packages.js";

export const connectDB=async()=>{
   try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log("Database connected");
   }
   catch(error){
    console.log("Database connection not succeded",error.message);
   }
}