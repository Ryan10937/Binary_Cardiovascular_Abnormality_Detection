const path = require('path');

exports.signup = (req, res, next) => {
    res.render('../views/signup.ejs');
}

exports.viewLogin = (req,res,next) =>{
    res.render('../views/login.ejs')
}