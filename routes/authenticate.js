const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userRegistration');
const { check, validationResult } = require('express-validator');

router.post('/signup', [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })],

    function (req, res, next) {
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

    function (req, res, next) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) return res.json({ status: 500, message: "Internal server error", err: err });
            else if (user) {
                return res.json({ status: 415, message: "email already exits" });
            }
            else next();
        });

    },

    function (req, res, next) {
        User.findOne({ userName: req.body.userName }, function (err, user) {
            if (err) return res.json({ status: 500, message: "Internal server error", err: err });
            else if (user) {
                return res.json({ status: 415, message: "user name already exits" });
            }
            else next();
        });

    },

    function (req, res, next) {
        const password = req.body.password;
        const cPassword = req.body.cpassword;
        if (password === cPassword) { next(); }
        else {
            return res.json({ status: 415, message: "password dint match" });
        }
    },

    function (req, res, next) {
        const userName = req.body.userName;
        const email = req.body.email;
        const phoneNumber = req.body.phone;
        const password = req.body.password;
        const gender = req.body.gender;
        const emailOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = new User({ userName: userName, email: email, phoneNumber: phoneNumber, password: password, emailOTP: emailOTP, isVerfied: false, gender: gender });

        newUser.save(function (err, user) {
            if (err) return res.json({ status: 500, message: "internal server error", err: err });
            else {
                let token = jwt.sign({ id: user._id }, 'blogsuser', { expiresIn: 180 });
                return res.json({ status: 200, message: "User created", token: token });
            }
        });

    }
);


module.exports = router;