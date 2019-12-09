const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require('../models/user');
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

    // function (req, res, next) {
    //     User.findOne({ email: req.body.email }, function (err, user) {
    //         if (err) return res.json({ status: 500, message: "Error on the server" });
    //         else if (user) {
    //             return res.json({ status: 415, message: "User already exits" });
    //         }
    //         else next();
    //     });

    // },

    function (req, res, next) {
        const password = req.body.password;
        const cPassword = req.body.cpassword;
        if (password === cPassword) { next(); }
        else {
            return res.json({ status: 415, message: "password dint match" });
        }
    },

    function (req, res, next) {
        const userName = req.body.Username;
        const email = req.body.email;
        const phoneNumber = req.body.phone;
        const password = req.body.password;
        const emailOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const myUser = new users({ userName: userName, email: email, phoneNumber: phoneNumber, password: password, emailOTP: emailOTP, isVerfied: false });

        myUser.save(function (err, user) {
            if (err) return res.json({ status: 500, message: "Error on the server" });
            else {
                let token = jwt.sign({ id: user._id }, 'blogsuser', { expiresIn: 180 });
                return res.json({ status: 200, message: "User created", token: token });
            }
        });

    });






module.exports = router;