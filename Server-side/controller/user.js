import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// used to check if the user is existed or not
export async function checkIfEmailExist(req) {
    const email = req.body.email;
    const existingUser = await User.findOne({email:email});
    return existingUser
}

// this is for generate the jwt token 
export function generateToken(getTheID , res){
    return jwt.sign({getTheID} , process.env.SECRET_KEY , {
        expiresIn : '15d'
    })
    res.cookie("jwt" , token , {
        maxAge : 15 * 16 * 24 * 60 * 60, 
        httpOnly : true , //prevent XSS attacks cross-site scripting attacks|
       sameSite : "strict" //  CSRF attacks cross-site request forgery attacks
    })
}


