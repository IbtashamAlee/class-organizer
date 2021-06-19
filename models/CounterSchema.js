var mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    _id: String,
    announcement_counter: {
        type: Number,
        default: 0
    },
    todo_counter: {
        type: Number,
        default: 0
    }
});

module.exports = Counter = mongoose.model('counterschema', CounterSchema);
