const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const signupRoute = require('./routes/signupForm');

app.use(express.static(__dirname + '/view'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(signupRoute);
app.get('/', function(req, res, next) {
    console.log("in the main page");
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.use(function(req, res, next) {
    console.log("in the error page");
    res.status(404).sendFile(path.join(__dirname, 'view', '404.html'));
});






app.listen(5000);


mongoose.connect('mongodb://localhost:27017/Restro')
    .then(function(result) {
        console.log("connected");
    })
    .catch(function(err) {
        console.log(err);
    });