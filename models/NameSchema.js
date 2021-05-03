var mongoose = require('mongoose');
const TestSchema = mongoose.Schema({
    title: String,
    description: String
});
module.exports = Test = mongoose.model('testCollection', TestSchema);
