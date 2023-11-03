const express = require('express')
const bcrypt = require('bcrypt');

const User = require('../models/user')

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password)
            .then(result=>{
                if(result){
                    req.session.isAuthenticated = true;
                    req.session.user=user;
                // res.cookie('isAuthenticated', true
                //  //,{expires: new Date(Date.now() + 60000)} // cookie'nin ömrü 1 dakika olarak ayarlanmıştır
                //     )
                res.redirect('/movies')
                }
                else{
                    res.redirect('/users/login')
                }
             })    
        }
        else{
            res.redirect('/users/login')
        }
       
    })
}


exports.getLogout = (req, res, next) => {
    // req.session.destroy();   Bütün sessionları siler.
    delete req.session.isAuthenticated; //Sadece isAuthenticated sessionı siler
    res.redirect('/movies')
}

exports.getRegister = (req, res, next) => {
    res.render('register');
}

exports.postRegister = (req, res, next) => {
    const {email, name, surname, password} = req.body;

    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        console.log(hashedPassword);
        const user = new User({
            email: email,
            name: name,
            surname: surname,
            password: hashedPassword
        })
        //const user = new User(req.body)
        user.save()
        .then(() => {
            res.redirect('/users/login');
        }).catch((err) => {
            console.log(err)
        })
    })   
}