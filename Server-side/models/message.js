import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    message : {
        type:String,
        trim : true
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"chat"
    }
   },{
    timestamps: true
   }


)

const Message = mongoose.model("message" , messageSchema)

export {Message}