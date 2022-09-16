const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    inchId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('blockchain', schema);
