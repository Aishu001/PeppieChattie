
export const sendMessage = async (req , res) => {
    
    const { message ,chatId} = req.body;
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

    }
    catch{
        
    }
}