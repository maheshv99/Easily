import nodemailer from "nodemailer";

const sendMail=async (email,Designation)=>{
   const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: 'codingninjas2k16@gmail.com',
        pass: 'slwvvlczduktvhdj'
    }
   });

   const options={
    from:'codingninjas2k16@gmail.com',
    to:email,
    subject: 'Successfully Applied to ' + Designation,
    text: 'You have successfully applied to this job. It takes time to verify your resume. please have patience and wait for our response.'
   };

   try {
    const result= await transport.sendMail(options);
   } catch (error) {
    console.log(error);
   }
}

export default sendMail;