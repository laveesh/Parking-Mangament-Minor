const express =require('express');
const userRouter = express.Router();
const User = require('../models/user');

//get user details by Email Id

userRouter.post('',function (req, res, next) {
    let user = new User(req.body);
    User.findOne({emailID : user.emailID}, function (err, data) {
        if( data != null ) {
            if (user.password == data.password) {
                console.log({message: "success",userID:data.emailID, userType: data.userType});
                res.json({message: "success",userID:data.emailID, userType: data.userType});
            } else {
                res.json({message:"Invalid credentials"});
            }
        }
        else{
            res.json({message:'User doesnot exists'});
        }
    });
})

userRouter.post('/register', function (req, res, next) {
    let user = new User(req.body);
console.log(user);
    User.create(user)
        .then(user => {
            res.status(200).json({message:"",'Result': 'User added successfully'});
        })
        .catch(err => {
            console.log("Cannot add user");
            res.status(400).send(err);
            res.json({message:"notsuccess"});
        });
})

module.exports = userRouter;
