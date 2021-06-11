var mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    _id: String,
    announcement_counter: {
        type: Number,
        default: 0
    }
});

module.exports = Counter = mongoose.model('counterschema', CounterSchema);

Counter.find().then((res) => {
    if (res.length === 0) {
        new Counter({
            _id: "None"
        }).save().then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
})
