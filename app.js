const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    console.log("in the main page");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(5000);