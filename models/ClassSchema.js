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
    assignments: [
        {
            id: Number,
            assignment: Buffer,
            filename: String,
            mimetype: String
        }
    ]
})

module.exports = Class = mongoose.model('classschema', ClassSchema);
