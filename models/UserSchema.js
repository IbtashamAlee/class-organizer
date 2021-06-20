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
    avatar: {
        type: String || Buffer,
        default: 'https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_2.png'
    },
    fullname: {
        type: String,
        required: true
    },
    contact: String,
    websiteUrl: String,
})

module.exports = User = mongoose.model('userschema', userSchema);
