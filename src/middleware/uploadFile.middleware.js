import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/resumes/');
    },
    filename:(req,file,cb)=>{
        const name="resume"+Date.now()+file.originalname;
        cb(null,name);
    }
});

export const uploadFile=multer({storage:storage});