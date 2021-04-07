const mongoose = require('mongoose');

const Exercise = mongoose.model(
    "Exercise", 
    new mongoose.Schema({
        name: {
            type: String, 
            required: true
        },
        description: String,
    }, {timestamps: true})
);

module.exports = Exercise;