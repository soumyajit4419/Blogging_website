const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/userRegistration');
const Posts = require('../models/allPosts');
const { check, validationResult } = require('express-validator');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage })




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
                let token = jwt.sign({ id: user._id }, 'blogsuser', { expiresIn: 86400 });
                return res.json({ status: 200, message: "User created", token: token });
            }
        });

    }
);

router.post('/login',
    function (req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;
        User.findOne({ userName: userName }, function (err, user) {
            if (err) {
                return res.json({ status: 500, message: "internal server error", err: err });
            }
            else if (!user) {
                return res.json({ status: 422, message: "user name not found" });
            }
            else if (user) {
                next();
            }

        })

    },
    function (req, res, next) {
        const userName = req.body.userName;
        User.findOne({ userName: userName }, function (err, user) {

            if (err) {
                return res.json({ status: 500, message: "internal server error", err: err });
            }
            else if (user) {
                if (user.isVerified == true) { next(); }
                else {
                    return res.json({ status: 415, message: "user not verified" });
                }
            }
        })

    },

    function (req, res, next) {
        const userName = req.body.userName;
        const password = req.body.password;
        User.findOne({ userName: userName }, function (err, user) {
            if (err) {
                return res.json({ status: 500, message: "internal server error", err: err });
            }
            else if (user) {
                if (user.password === password) {
                    const token = jwt.sign({ id: user._id }, 'blogsuser', { expiresIn: 86400 });
                    return res.json({ status: 200, message: "User sucessfully loggedin", token: token });
                }
                else if (user.password !== password) {
                    return res.json({ status: 422, message: "wrong password" });
                }
            }
        })
    }
);

router.post('/verify', verifyToken, function (req, res, next) {
    const id = req.userId;
    User.findById(id, function (err, user) {
        if (err) {
            return res.json({ status: 500, message: "internal server error", err: err });
        }
        else if (!user) {
            return res.json({ status: 422, message: "user not found" });
        }
        else if (user.isVerfied == true) {
            return res.json({ status: 415, message: "user already verified" });
        }
        else {
            otp = req.body.otp;
            if (user.emailOTP == otp) {
                user.isVerified = true;
                user.save();
                return res.json({ status: 200, message: "user verified sucessfully" });
            }
            else {
                return res.json({ status: 422, message: "invalid otp" });
            }
        }
    })

});

router.get("/getUserState", verifyToken, function (req, res) {
    const userId = req.userId;
    async function getState() {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.json({ status: 400, auth: false, message: 'User not found!' });
            }
            else if (user.isVerified == true) {
                return res.json({ status: 200, auth: true, message: 'Token authenticated!', verified: true });
            }
            else { return res.json({ status: 415, auth: true, message: 'Token authenticated!', verified: false }); }
        }
        catch (err) {
            console.log(err);
            return res.json({ status: 500, auth: false, message: 'Internal server error!', err: err });
        }
    }
    getState();
});

router.post('/upload', upload.single('file'), verifyToken, function (req, res, next) {
    var file = req.file.filename;
    const id = req.userId;
    User.findById(id, function (err, user) {
        if (err) {
            return res.json({ status: 500, message: 'Internal server error!', err: err });
        }
        else if (!user) {
            return res.json({ status: 422, message: 'no user found' });
        }
        else if (user) {
            const headline = req.body.headline;
            const message = req.body.message;
            const userName = user.userName;

            user.post.push({ headline: headline, message: message, imageName: file });
            user.save();

            var newPosts = new Posts({ headline: headline, message: message, imageName: file, userName: userName });
            newPosts.save();

            return res.json({ status: 200, message: "post added successfully" });
        }

    });

});

router.get('/getAllPosts', function (req, res, next) {
    async function getall() {
        await Posts.find({}, function (err, post) {
            if (err) {
                return res.json({ status: 500, message: 'Internal server error!', err: err });
            }
            else if (post) {
                return res.json(post);

            }

        });
    }

    getall();
});



router.get('/getUserPosts', verifyToken, function (req, res, next) {
    async function getallP() {

        const id = req.userId;
        await User.findById(id, function (err, user) {
            if (err) {
                return res.json({ status: 500, message: 'Internal server error!', err: err });
            }
            else if (user) {
                return res.json({ post: user.post, userName: user.userName });

            }
        })

    }

    getallP();
});

function verifyToken(req, res, next) {
    const token = req.headers['access-token'];
    if (!token) {
        return res.json({ status: 422, message: "no token found" });
    }
    else {
        jwt.verify(token, 'blogsuser', function (err, decoded) {
            if (err) {
                return res.json({ status: 500, message: "internal server error", err: err });
            }
            else {
                req.userId = decoded.id;
                next();
            }

        })
    }
}
module.exports = router;