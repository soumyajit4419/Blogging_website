const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    isverified: { type: Boolean, default: false },
    emailOtp: { type: Number },
    userId: { type: Number, default: -1 }

});

module.exports=mongoose.model('user',userSchema);