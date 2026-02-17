import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, {timestamps: true})

const Session = mongoose.model("session", sessionSchema);

export default Session;