import { Message } from "../models/message.js";
import { Chat } from "../models/chat.js";
import User from "../models/user.js";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'drvjgfgb0', 
  api_key: '198244868835615', 
  api_secret: '42Hi5l48HYIyLcnEGKw9nUEQuiY' 
});

export const sendingTheMessage = async (req , res) => {
    
    const { message ,chatId ,image} = req.body;
    if (!message || !chatId) {
        console.log("Invalid data passed into request");
        return res.send(400);
    }

    const newMessage = {
        sender : req.user._id,
        message: message,
        chat: chatId
    }
    try{
        let imageUrl;
        if (image) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(image, { folder: 'chat_images' });
            imageUrl = result.secure_url;
        }

        if (imageUrl) {
            newMessage.image = imageUrl; // Add image URL to the message
        }
        const createMessage = await Message.create(newMessage)

       let populateMessage = await  createMessage.populate('sender', ' fullName profileImageUrl')
        populateMessage = await User.populate( populateMessage, {
            path: "chat.users",
            select: " fullName profileImageUrl email",
            });
            
            await Chat.findByIdAndUpdate(req.body.chatId , {
                latestMessage : populateMessage
            })

            res.json(populateMessage);

    }
    catch(error){
        res.status(400)
            throw new Error(error.message)

    }
}
export const allMessage = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "email  profileImageUrl") // Add profileImage to populate
            .populate({
                path: "chat",
                populate: {
                    path: "users",
                    select: "email  profileImageUrl" // Add profileImage to select
                }
            });

        return res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
