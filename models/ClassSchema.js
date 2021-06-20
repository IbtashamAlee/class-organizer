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
    image: {
        type: String || Buffer,
        default: "https://www.gstatic.com/classroom/themes/img_code.jpg"
    },
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
