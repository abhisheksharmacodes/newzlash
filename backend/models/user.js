const mongoose = require("mongoose")
//Defining Schema
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    action_plan: [
        {
            info: {
                type: String,
                required:true
            }
        }
    ],
    task_channels: [
        {
            title: {
                type: String,
                required: true,
            },
            tasks: {
                info: {
                    type: String,
                    required: true,
                },
                status: {
                    type: Boolean,
                    required: true
                }
            }
        }
    ],
    daily: {
        groups: [
            {
                title: {
                    type: String,
                    required: true,
                },
                tasks: {
                    info: {
                        type: String,
                        required: true,
                    },
                    status: {
                        type: Boolean,
                        required: true
                    }
                }
            }
        ]
    },
    today: {
        groups: [
            {
                title: {
                    type: String,
                    required: true,
                },
                tasks: {
                    info: {
                        type: String,
                        required: true,
                    },
                    status: {
                        type: Boolean,
                        required: true
                    }
                }
            }
        ]
    },
},
    { timestamps: true }
)
//Exporting the schema
module.exports = mongoose.model("User", userSchema)