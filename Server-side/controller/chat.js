import { Chat } from "../models/chat.js";
import User from "../models/user.js";
export const createChat = async(req , res) => {
    const  {userId } = req.body
    if (!userId) {
        console. log("UserId param not sent with request");
        return res. sendStatus(400);}
        
        var isChat = await Chat.find({
$and: [
    { users: { $elemMatch: { $eq: req. user._id } } },
{ users: { $elemMatch: { $eq: userId } } },
]}).populate("users" , "-password")
.populate("latestMessage")
 

if(isChat.length > 0) {
res.send(isChat[0])
}else{
    var chatData = {
chatName: "sender",
isGroupChat: false,
users:
[req. user. _id, userId],
}

try {
    const createChat=await Chat.create(chatData);
    const FullChat= await Chat.findOne({_id:createChat._id}).populate("users","-password");

   return  res.status(200).send(FullChat);
    
} catch (error) {
     return res.status(500).send("internal server error",error);

}
}
} 


export const getChatsParticular = async (req, res) => {
    try {
        const results = await Chat.find({
            users: { $in: [req.user._id] } // Use $in operator to match documents containing the user ID
        })
        .populate('users', '-password')
        .sort({ updatedAt: -1 });

        // Populate latestMessage sender details
        const populatedResults = await User.populate(results, {
            path: 'latestMessage.sender',
            select: 'name pic email'
        });

        res.status(200).send(populatedResults);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};