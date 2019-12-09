const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/Blogs')
    .then(function (result) {
        console.log("DataBaseConnected");
    })
    .catch(function (err) {
        console.log(err);
    });


app.listen(5000);