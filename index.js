import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import UserController from "./src/controller/user.controller.js";
import {uploadFile} from "./src/middleware/uploadFile.middleware.js";
import Recrutier from "./src/controller/recrcuiter.controller.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import auth from "./src/middleware/auth.middleware.js";


const app=express();

const userController=new UserController();
const recruiterController=new Recrutier();

app.use(urlencoded({extended:true}));
// app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("view engine","ejs");
app.set("views",path.resolve("src","views"));

app.use(cookieParser());
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"secrektKey",
    cookie:{secure:false}
}));


app.get("/",userController.getHome);
app.get("/jobs",userController.getJobs);
app.get("/jobs/:id",userController.getJobDetails);
app.post("/jobs/:id/apply",uploadFile.single("resume"),userController.getApplication);

app.get("/register",recruiterController.register);
app.post("/register",recruiterController.addUsers);
app.get("/login",recruiterController.login);
app.post("/login",recruiterController.checkCreds);
app.get("/logout",recruiterController.lagout);

app.get("/applicants/:id",auth,recruiterController.getApplications);
app.get("/newjob",auth,recruiterController.getNewJob);
app.post("/newjob",recruiterController.addNewJob);

app.get("/job/update/:id",recruiterController.renderUpdatePage);
app.post("/job/update/:id",recruiterController.updateJobDetails);

app.get("/job/delete/:id",recruiterController.deleteJob);








app.get("/resume/:filename",recruiterController.getResume);



export default app;