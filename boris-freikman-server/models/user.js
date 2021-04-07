const mongoose = require("mongoose");

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String, 
        weight: Number,
        snatchRecord: Number,
        cleanJerkRecord: Number,
        workouts: [
            {
                _id: false,
                workout: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Workout"
                },
                snatchRecord: Number, 
                cleanJerkRecord: Number
                /*
                Records above are the records at the time of the creation of the workout.
                Made so that when the user looks at a past workout, he will see the weights that 
                were done at the time.
                */
            }
        ],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    }, {timestamps: true})
);

module.exports = User;