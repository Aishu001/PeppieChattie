import mongoose, { models } from "mongoose";

const chatListSchema = new mongoose.Schema({
    chatName:{type:String,trim:true},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
],
latestMessage : {
    type : mongoose.Schema.Types.ObjectId,
    ref:"Message",
}
},{
     timestamps: true

})

const Chat = mongoose.model("Chat" , chatListSchema)

export {Chat}