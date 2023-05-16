import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    purchaser: {
        type: String,
        required: true
    }
})

export const ticketModel = mongoose.model('Ticket', ticketSchema);