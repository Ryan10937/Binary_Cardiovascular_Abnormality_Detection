const express = require('express')
const mongoose = require('mongoose');

const path = require('path')



const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

mongoose.connect('mongodb+srv://Aditya_Admin:Aravind1996@aicluster.3d2rz.mongodb.net/ECG?retryWrites=true&w=majority').then(result=>{
    app.listen(3012);
    console.log("Connected to Database!!!")
    console.log("Server running on port 3012")
}).catch(err=>{
    console.log("Unable to Connect to Database",err)
})
