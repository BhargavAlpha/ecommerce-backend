const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    requests_count: { type: Number, default: 0 },
    requests_approved: { type: Number, default: 0 },
    requests_rejected: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
