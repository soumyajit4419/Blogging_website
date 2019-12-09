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
app.use(function (req, res, next) {
    console.log("in the error page");
    res.status(404).sendFile(path.join(__dirname, 'view', '404.html'));
});

mongoose.connect('mongodb://localhost:27017/Blogs')
    .then(function (result) {
        console.log("DataBaseConnected");
    })
    .catch(function (err) {
        console.log(err);
    });

app.listen(5000);