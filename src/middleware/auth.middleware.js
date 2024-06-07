 const auth=(req,res,next)=>{
    if(req.session.email){
      return next();
    }
    res.render("pageError");
  }

  export default auth;