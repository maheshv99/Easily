import Jobs from "../model/jobs.model.js";
import sendMail from "../middleware/emailGenerator.middleware.js";

const jobsModel=new Jobs();

export default class UserController{
    getHome(req,res){
   res.render("home");
    }

    getJobs(req,res){
        const jobsObj=jobsModel.getJobs();
        res.render('jobs',{jobs:jobsObj,user:req.session.email,name:req.session.name});
    }

    getJobDetails(req,res){
        const jobDetails=jobsModel.getJobDetails(req.params.id);
        res.render("viewDetails",{job:jobDetails,user:req.session.email,name:req.session.name});
    }
    getApplication(req,res){
        const details={resume:req.file.filename,...req.body};
        const id =req.params.id;
        const jobDetails=jobsModel.getJobDetails(id);
        jobsModel.addApplications(details,id);
        sendMail(req.body.email,jobDetails.designation);
        res.redirect("/jobs");
    }
}