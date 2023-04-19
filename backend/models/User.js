const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAuthorized: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('User', UserSchema);
