import Jobs from "../model/jobs.model.js";
import path from "path";

const users = [{id:1,name:"mahesh",email:"mahi@gmail.com",password:"123"}];

const jobs = new Jobs();
// var name;

export default class Recrutier {
  register(req, res) {
    res.render("register");
  }

  addUsers(req, res) {
    try {
      // Adding user with a unique id
      const data = { id: users.length + 1, ...req.body };
      users.push(data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
    res.render("login", { error: null });
  }
  login(req, res) {
    res.render("login", { error: null });
  }

  checkCreds(req, res) {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        req.session.email = email;
        req.session.name=user.name;
        const job=jobs.getJobs();
        // name=user.name;
        res.render("jobs",{jobs:job,user:req.session.email,name:req.session.name});
      } else {
        console.log("Invalid credentials");
        res.status(401).render("login", { error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .render("login", { error: "An error occurred during login"});
    }
  }

  getApplications(req, res) {
    const id = req.params.id;
    const jobDetails = jobs.getJobDetails(id);
    res.render("application", { users: jobDetails.applicants });
  }

  getResume(req, res) {
    const filePath = path.join(
      path.resolve(),
      "/public/resumes",
      req.params.filename
    );
    res.sendFile(filePath);
  }


 getNewJob(req,res){
    res.render('newjob',{user:req.session.email,name:req.session.name});
  }

  addNewJob(req,res){
    jobs.addJob(req.body);
    res.redirect("/jobs");
  }

  renderUpdatePage(req,res){
    const id=req.params.id;
    const details=jobs.getJobDetails(id);
    res.render("update",{user:req.session.email,name:req.session.name,job:details});
  }

  updateJobDetails(req,res){
    const id=req.params.id;
    const updatedDetails=req.body;
   updatedDetails.id=id;
   jobs.updateJobDetails(updatedDetails);
   res.redirect("/jobs");
  }

  deleteJob(req,res){
  let id =req.params.id;
  jobs.deleteJob(id);
  res.redirect("/jobs");
  }


  lagout(req,res){
    //on logout=> destroy the session
    req.session.destroy((err)=>{
        if(err){
         console.log(err);
         res.status(500).send("Failed to log out.");
        }else{
            res.redirect('/');
        }
    });
}
}
