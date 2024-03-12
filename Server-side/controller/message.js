
export const sendMessage = async (req , res) => {
    
    const { message ,chatId} = req.body;
    if (!message || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendS(400);
    }
}