const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    inputspec: {
        type: String,
        required: true
    },
    outputspec: {
        type: String,
        required: true
    },
    sampleinput: {
        type: String,
        required: true
    },
    sampleoutput: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Problem', problemSchema);