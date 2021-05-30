var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String
    }
})

module.exports = User = mongoose.model('userschema', userSchema);
