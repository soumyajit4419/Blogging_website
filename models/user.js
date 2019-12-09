
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    emailOTP: { type: Number }

});


module.exports = mongoose.model('users', userSchema);
