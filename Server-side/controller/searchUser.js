import User from "../models/user.js"
export const searchUser = async (userId, req, res) => {
    try {
        // Check if userId is provided
        if (!userId) {
            throw new Error("User ID not provided.");
        }

        const keyword = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } }
            ]
        } : {};

        const user = await User.findOne({
            ...keyword,
            _id: { $ne: userId }
        });

        // Handle case when user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Respond with the found user
        return res.status(200).json(user);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error in searchUser:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};




// export const searchUser = async (req, res) => {
//     try {
//         // Check if req.user is defined and has _id property
//        if (!req.user || !req.user._id) {
//             throw new Error("User ID not found in request object.");
//         }

//         const keyword = req.query.search ? {
//             $or: [
//                 { name: { $regex: req.query.search, $options: "i" } }
//             ]
//         } : {};

//         const user = await User.findOne({
//             ...keyword,
//             _id: { $ne: req.user._id }
//         });

//         // Handle case when user is not found
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Respond with the found user
//         return res.status(200).json(user);
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error("Error in searchUser:", error);
//         return res.status(500).json({ message: "Internal server error." });
//     }
// }





// export const searchUser = async(req , res) => {
//     const keyword = req.query.search ? {
//         $or : [
//             {name : {
//                 $regex : req.query.search , $options: "i"  
//             }}
//         ]
//     }
//     :{}

//     const user = await  User.findOne(keyword)
// }