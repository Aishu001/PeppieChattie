import { Chat } from "../models/chat";

export const createChat = async(req , res) => {
    const  {userId } = req.body
    if (!userId) {
        console. log("UserId param not sent with request");
        return res. sendStatus(400);}
        
        var isChat = await Chat.find({
$and: [
    { users: { $elemMatch: { $eq: req. user._id } } },
{ users: { $elemMatch: { $eq: userId } } },
]}).populate("user" , "-password")
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


export const getChatsParticular = async(req , res) => {
    try{
        Chat.find({
            user : {
                $elemMatch : {$eq : req.user._id}
     } })
     .populate('user','-password')
     .sort({updatedAt:-1})
     if (!chats) {
        return res.status(404).json({ error: "Chats not found." });
    }

    return res.status(200).json(chats);


    }
   catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    
    
}