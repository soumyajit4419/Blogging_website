const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
    console.log("in the blog page");
    res.sendFile(path.join(__dirname, '../', 'public', 'travel.html'));
});



module.exports = router;