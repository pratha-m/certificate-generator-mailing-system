import { sendEmail } from "../middlewares/sendEmail.js";
import { generateCertificate } from "../helpers/generateCertificate.js";
import { excelToJson } from "../helpers/excelToJson.js";
import * as userServices from "../services/userServices.js";

const createUser=async(req,res)=>{
    try{
        const excelFile=req.file;

        if(!excelFile) return res.status(500).json({success:false,message:"Erorr in Uploading File",error:error.message});

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
            const {name,email,phone,no_of_trees}=updatedObj;
           
            const bufferPdf=await generateCertificate(name,no_of_trees);
           
            const emailFound=await userServices.findByEmail(email);

            const phoneFound=await userServices.findByPhone(phone);

            await sendEmail(name,email,`${name}'s Certificate.pdf`,bufferPdf.toString("base64")); 
            
            if(!emailFound && !phoneFound){
                await userServices.createUserService(updatedObj);
            }
        })

        await Promise.all(promises);

        const users=await userServices.findAllUsers();

        res.status(200).json({success:true,message:"Certificate Sent Successfully",users:users}) 
    }
    catch(error){
        res.status(500).json({success:false,message:"Erorr in Sending certificates",error:error.message})
    }
}
const getAllUsers=async(req,res)=>{
    try{
        const users=await userServices.findAllUsers();

        console.log(users)

        res.status(200).send({success:true,message:"get all data",users:users}) 
    }
    catch(error){
        res.status(500).send({success:false,message:"Erorr in getting all users",error:error.message})
    }
}

export {createUser,getAllUsers};