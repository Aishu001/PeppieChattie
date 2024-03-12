import User from "../models/user"

export const searchUser = async(req , res) => {
    const keyword = req.query.search ? {
        $or : [
            {name : {
                $regex : req.query.search , $options: "i"  
            }}
        ]
    }
    :{}

    const user = await  User.findOne(keyword).find({
        _id :{
            $ne :req.user._id
        }
    })
}

