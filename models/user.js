const mongoose = require('mongoose')
const user = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [128, "Password cannot exceed 128 characters"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
            "Password must include uppercase, lowercase, number, and special character"
        ]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})
module.exports = mongoose.model("user", user)