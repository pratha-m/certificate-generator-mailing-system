import nodemailer from "nodemailer";

export const sendEmail=async(userName,userEmail,fileName,pdfBuffer)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.FROM_EMAIL,
            pass:process.env.FROM_EMAIL_PASSWORD
        }
    })
    const mailOptions={
        from:process.env.FROM_EMAIL,
        to:userEmail,
        subject:`Thanku For The Donation ${userName}`,
        text:"Thank you for your generous donation to support tree planting initiatives. Your contribution will make a positive impact on the environment.\n\nPlease find the attached Certificate for your donation.",
        attachments:[
            {
                filename:fileName,
                content:pdfBuffer,
                encoding:"base64"
            }
        ]
    }
    await transporter.sendMail(mailOptions) 
}