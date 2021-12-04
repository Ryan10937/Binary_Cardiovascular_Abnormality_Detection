const express = require('express')
const mongoose = require('mongoose');

const path = require('path')
const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')


const app = express();
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const session = require('express-session')
app.use(session({secret:'myECGFinalSession', resave:false,saveUninitialized:false}));
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:false}))
app.use( express.static( "Results" ) ); 

app.use(userRoutes);
app.use(loginRoutes);


mongoose.connect('mongodb+srv://Aditya_Admin:Aravind1996@aicluster.3d2rz.mongodb.net/ECG?retryWrites=true&w=majority').then(result=>{
    app.listen(3000);
    console.log("Connected to Database!!!")
    console.log("Server running on port 3000")
}).catch(err=>{
    console.log("Unable to Connect to Database",err)
})
