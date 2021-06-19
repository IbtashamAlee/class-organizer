var mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    announcements: [
        {
            id: Number,
            announcement: String
        }
    ],
    todos: [
        {
            id: Number,
            todo: String
        }
    ],
    image: String,
    section: String,
    details: String,
    assignments: {
        type: Array
    }
})

module.exports = Class = mongoose.model('classschema', ClassSchema);
