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
    annoucements: Array,
    todos: Array,
    assignments: {
        type: Object
    }
})

module.exports = Class = mongoose.model('classschema', ClassSchema);
