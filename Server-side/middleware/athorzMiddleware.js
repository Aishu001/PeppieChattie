import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateUser = (req, res, next) => {
    // Check for Authorization header
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log the authorization header

    if (authHeader && authHeader.startsWith('Bearer ')) {
        console.log('Unauthorized: Token missing or malformed');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // const token = authHeader.substring(7); // Remove the 'Bearer ' prefix
    // console.log('Extracted Token:', token); // Log the extracted token

    try {
        const token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =  User.findById(decoded.id).select("-password");
        ;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error); // Log JWT verification error
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export default authenticateUser;
