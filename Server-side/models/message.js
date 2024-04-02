import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: {
        type: String,
        trim: true
    },
    // Add fields for emojis and images
    emojis: [{
        type: String,
        trim: true
    }],
    images: [{
        type: String,
        trim: true
    }],
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat"
    }
}, {
    timestamps: true
}


)

const Message = mongoose.model("message" , messageSchema)

export {Message}