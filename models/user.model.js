const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim : true,
        unique : true,
        lowercase: true,
        unique: true,
        minlength: [3, "Username must be at least 3 characters long"], //ye error message ke form me jayega agar user 3 char se kam ka username daal dega

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
        minlength:[10, "Email must be at least 10 characters long"],
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Password must be at least 8 characters long"],
    }    
})

const User = mongoose.model("User", userSchema);
module.exports = User;