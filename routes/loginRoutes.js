const path = require('path');

const express = require('express');

const loginController = require('../controller/loginController')

const router = express.Router();



//router.post('/upload',upload.single('file'),mainController.uploadPatientData);

router.get('/signup',loginController.signup);

router.get('/',loginController.viewLogin);

module.exports = router;