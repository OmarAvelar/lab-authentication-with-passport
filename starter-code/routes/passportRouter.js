const express        = require("express");
const passportRouter = express.Router();
const User = require("../models/user");
const passport = require("passport");



//midelware

function ensureLoggedIn(req,res,next){
  if(req.isAuthenticated()){ //esto es la seguridad
    return next()
  }
  return res.redirect("/auth/login");
}

// Require user model

// Add bcrypt to encrypt passwords

// Add passport 


//const ensureLogin = require("connect-ensure-login");

passportRouter.get('/signup', (req,res,next)=>{
  res.render('passport/signup')
})

passportRouter.post('/signup', (req,res,next)=>{
  User.register(req.body, req.body.password)
  .then(user =>{
    res.json(user);
  }).catch(e=>next(e));
});


passportRouter.post("/login", passport.authenticate('local'),(req,res,next)=>{
  const username = req.user.username;
  res.send("Tu eres un usario real con email: " + username);
})

passportRouter.get("/login", (req,res,next)=>{
    res.render("passport/login");
})

passportRouter.get("/private", ensureLoggedIn, (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;