const express = require('express');
const router = express.Router();
const path = require('path');
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

router.post('/upload', upload.single('file'), function (req, res, next) {

    var file = req.file.filename;
    console.log(file);
    // const newFile = new Files({ fileName: file });
    // newFile.save();
    return res.json({ status: 200, message: "file uploaded sucessfully" });

});

module.exports = router;