
const mongoose = require('mongoose');

const schema = mongoose.Schema;


const postSchema = new schema({
    headline: { type: String },
    message: { type: String },
    imageName: { type: String },
    likes: { type: Number, default: 0 }
});

const userSchema = new schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    emailOTP: { type: Number },
    gender: { type: String, required: true },
    post: { type: [postSchema], default: [] }

});


module.exports = mongoose.model('User', userSchema);
