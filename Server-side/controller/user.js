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
    return jwt.sign({getTheID} , process.env.SECRET_KEY )
  
}


