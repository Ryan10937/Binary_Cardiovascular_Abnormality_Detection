const Patient = require('../model/patient');

const path = require('path');

exports.uploadPatientData = (req,res,next)=>{
    
    res.render(path.join(__dirname,'..','views','result.ejs'))
}

exports.viewUplaodPage = (req,res,next)=>{
    res.render(path.join(__dirname,'..','views','submitData.ejs'))
}

