const path = require('path');

const express = require('express');

const mainController = require('../controller/mainController')

const router = express.Router();

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"CSV")
    },
    filename: (req,file,cb) =>{
        console.log(file)
        cb(null, 'csv' + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})


router.post('/upload',upload.single('file'),mainController.uploadPatientData);

router.get('/upload',mainController.viewUplaodPage);

router.get('/viewDashboard',mainController.viewDashboard);

router.get('/viewResult',mainController.viewResult);

router.get('/viewDashboard/:patient_id',mainController.getPatientDetails);


module.exports = router;