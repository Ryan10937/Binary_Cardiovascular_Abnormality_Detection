const path = require('path');
const Doctor = require('../model/doctor');
const bcrypt = require('bcrypt')
const UUID = require('UUID')
exports.signup = (req, res, next) => {
    res.render('../views/signup.ejs');
}

exports.viewLogin = (req,res,next) =>{
    res.render('../views/login.ejs')
}

exports.postLogin = (req,res,next)=>{
    const email = req.body.username;
    const password = req.body.password;
    Doctor.findOne({ email: email })
        .then(doc => {
            if (!doc) {
                return res.redirect('/')
            }
            bcrypt
                .compare(password, doc.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.doc = doc;
                        req.session.doc_id = doc.doc_id;
                        console.log(req.session)
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/viewDashboard');
                        });
                    }
                    res.redirect('/');
                }).catch(err => {
                    console.log(err);
                    res.redirect('/');
                })
        })
}

exports.addDoc = async (req, res, next) => {

    try {
        console.log("REQ Body",req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const doc = new Doctor({
            name: req.body.name,
            gender: req.body.gender,
            password: hashedPassword,
            email: req.body.email,
            doc_id: UUID.v4().toString()
        });
        DOC_ID = req.body.doc_id;
        doc
            .save()
            .then(result => {
                console.log("Inserted Doc Successfully", doc)
                res.redirect('/')
            }).catch(err => {
                console.log("Error", err)
                res.send("Issue in Inserting data")
            })


    } catch (err) {
        res.redirect('/register')
        console.log(err);
    }
}
