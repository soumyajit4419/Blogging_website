const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
    console.log("in the blog page");
    res.sendFile(path.join(__dirname, '../', 'public', 'travel.html'));
});

// router.use(function (req, res, next) {
//     console.log("in the error page");
//     res.status(404).sendFile(path.join(__dirname, '../', 'public', '404.html'));
// });

// router.get('/index.html', function (req, res, next) {
//     console.log("in the blog page");
//     res.status(404).sendFile(path.join(__dirname, '../', 'view', 'index.html'));
// });

// router.get('/register', function (req, res, next) {
//     console.log("in the register page");
//     res.status(404).sendFile(path.join(__dirname, '../', 'view', 'register.html'));
// });


// router.get('/login.html', function (req, res, next) {
//     console.log("in the login page");
//     res.status(404).sendFile(path.join(__dirname, '../', 'view', 'login.html'));
// });


module.exports = router;