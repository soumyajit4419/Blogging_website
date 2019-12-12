const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticateRoute = require('./routes/authenticate');
const viewRoutes = require('./routes/view');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(viewRoutes);
app.use(authenticateRoute);

app.listen(5000);
mongoose.connect('mongodb://localhost:27017/Blogs')
    .then(function (result) {
        console.log("connected");
    })
    .catch(function (err) {
        console.log(err);
    });
