var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    isTutor: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: String,
    username: String,
    avatar: String,
    contact: String,
    websiteUrl: String,
})

module.exports = User = mongoose.model('userschema', userSchema);
