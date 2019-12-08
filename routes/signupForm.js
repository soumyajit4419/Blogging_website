const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('json-web-token');
const { check, validationResult } = require('express-validator');
const user = require('../models/user');




router.post('/signup',

    [check('email').isEmail(), check('passwd').isLength({ min: 5 })],

    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (errors.errors[0].param == "email") {
                return res.json({ status: 422, message: "Invalid email address" });
            } else {
                return res.json({
                    status: 422,
                    message: "Invalid password, password length must be greater than 5."
                });
            }
        }
        next();
    },

    function(req, res, next) {
        user.findOne({ userName: req.body.userName }, function(err, user) {
            if (err) return res.json({ status: 500, message: "Error on the server" });
            else if (user)
                return res.json({ status: 415, message: "User Name already exits" });
            else next();
        });

    },
    function(req, res, next) {
        user.findOne({ email: req.body.email }, function(err, user) {
            if (err) return res.json({ status: 500, message: "Error on the server" });
            else if (user)
                return res.json({ status: 415, message: "email already exits" });
            else next();
        });

    },

    function(req, res, next) {
        const name = req.body.name;
        const userName = req.body.userName;
        const email = req.body.email;
        const phone = req.body.phoneNumber;
        const password = req.body.passwd;
        const emailOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const User = new user({ name: name, userName: userName, email: email, phoneNo: phone, password: password, emailOtp: emailOTP, isVerfied: false });
        User.save(function(err, user) {
            if (err) return res.json({ status: 500, message: "Error on the server" });
            else
                return res.json({ status: 200, message: "User created" });
        });
    });



module.exports = router;