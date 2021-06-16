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
    announcements: Array,
    todos: Array,
    image: String,
    section: String,
    details: String,
    assignments: {
        type: Array
    }
})

module.exports = Class = mongoose.model('classschema', ClassSchema);
