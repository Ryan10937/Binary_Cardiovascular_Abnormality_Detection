const Patient = require('../model/patient');
const uid = require('UUID');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs')
let exe;
let inputPath,PATIENT_ID,dateCSV;
exports.uploadPatientData = async(req,res,next)=>{
    
    const patient = new Patient({
        patient_id: uid.v4(),
        patient_name: req.body.name,
        patient_age: req.body.age,
        patient_gender: req.body.gender,
        patient_email: req.body.email,
        sampling_frequency : req.body.sampling_frequency,
        doc_id: "",
        result:"",
        updated_at: Date.now().toString(),
        date: req.body.date.toString()
    })
    let filename = fs.readdirSync(path.join(__dirname,'..','CSV'));
    let f = filename.filter(file=>
        {
             return file.includes('csv');
        })
     exe = path.extname(f[0]);
    fs.renameSync(path.join(__dirname, '..', 'CSV', 'csv' + exe), path.join(__dirname, '..', 'CSV', patient.patient_id + exe));
    let pa = path.join(__dirname,'..','CSV',uid + exe);
    inputPath = pa;
    dateCSV = patient.date;
    PATIENT_ID = patient.patient_id;
    console.log("Patient",patient)
    await saveDB(patient);
    await callPy(inputPath,patient)
    

    
    
   
}

exports.viewUplaodPage = (req,res,next)=>{
    res.render(path.join(__dirname,'..','views','submitData.ejs'))
}


async function saveDB(patient){
    patient.save().then(result=>{
        console.log("Patient details Inserted successfuly");
        
    }).catch(err=>{
        console.log("error in inserting patinet",err);
    })
}

async function callPy(inputPath,patient){
    const childPython =  spawn('py', [path.join(__dirname, '..', 'Python', 'Cardiovascular_abnormality_detection_ANN.py'),inputPath,patient.date,patient.sampling_frequency,path.join(__dirname,"..","Results")])
                childPython.stdout.on('data',(data)=>{
                    console.log("stdout:",data.toString());
                })
                
                childPython.stderr.on('data',(data)=>{
                    console.log("stderr:",data.toString());
                })
}