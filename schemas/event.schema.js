const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        default: () => uuidv4()
    },
    name: {
        type: String,
        required: [true, 'Event name is required'],
        minLength: 1,
        maxLength: 20,
        trim: true
    },
    description: {
        type: String,
        maxLength: 100,
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: 0
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
        lowercase: true
    },
    attachment: {
        type: String,
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;