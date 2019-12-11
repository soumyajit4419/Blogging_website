const mongoose = require('mongoose');

const schema = mongoose.Schema

const postSchmema = new schema({
    headline: { type: String },
    message: { type: String, required: true },
    imageName: { type:String}

});

module.exports = mongoose.model('posts', postSchmema);