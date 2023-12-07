// Importing Built in modules  
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import multer from "multer";
// Importing Custom Functions
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { sendEmail } from "./middlewares/sendEmail.js";
import { generateCertificate } from "./helpers/generateCertificate.js";
import { excelToJson } from "./helpers/excelToJson.js";

const app=express();

connectDB();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs')

const upload=multer({storage: multer.memoryStorage()});

app.post("/create",upload.single("file"),async(req,res)=>{
    try{
        const excelFile=req.file;

        let userData=excelToJson(excelFile.buffer);

        const oneTree=100;

        const promises=userData.map(async(eachUser)=>{
            const keysArray=Object.keys(eachUser);
            const updatedObj={
                name:eachUser[keysArray[0]],
                email:eachUser[keysArray[1]],
                phone:eachUser[keysArray[2]],
                amount:eachUser[keysArray[3]],
                no_of_trees:parseInt(eachUser[keysArray[3]]/oneTree)
            }   
            const {name,email}=updatedObj;
           
            const bufferPdf=await generateCertificate(name);
           
            const emailFound=await User.findOne({email:email});

            if(!emailFound){
                await sendEmail(name,email,`${name}'s Certificate.pdf`,bufferPdf.toString("base64")); 

                await User.create(updatedObj);
            }
        })

        await Promise.all(promises);

        const users=await User.find({});

        res.status(200).json({success:true,message:"Data inserted",users:users}) 
    }
    catch(error){
        res.status(500).json({success:false,message:"Erorr in data insertion",error:error.message})
    }
})
app.get("/all",async(req,res)=>{
    try{
        const users=await User.find({});

        res.status(200).json({success:true,message:"get all data",users:users}) 
    }
    catch(error){
        res.status(500).json({success:false,message:"Erorr in getting all users",error:error.message})
    }
})

app.listen(3001,()=>{
    console.log("server is listening at port 3001");
})