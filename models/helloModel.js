const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helloSchema = new Schema({

    message: {type : String, required: true}

});

const Hello = mongoose.model('hello', helloSchema);

module.exports = Hello;