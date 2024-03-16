import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateUser = async (req, res, next) => {
    // Check for Authorization header
//   const  JWT_SECRET='MySuperSecretKey123!@'
    const authHeader = req.headers['authorization'];
   

    console.log('Authorization Header:', authHeader); // Log the authorization header

    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = req.headers.authorization.split(" ")[1]; 
        console.log('Extracted Token:', token); // Log the extracted token

        try {
            console.log('Request Headers:', req.headers);
            console.log('Request secret key:', process.env.SECRET_KEY);
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            console.log('Decoded Token:', decoded); // Log the decoded token payload
            req.user = await User.findById(decoded.getTheID).select("-password");
            if (!req.user) {
                console.error('User not found');
                return res.status(403).json({ message: 'User not found' });
            }
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error); // Log JWT verification error
            return res.status(403).json({ message: 'Forbidden' });
        }
    } else {
        console.log('Unauthorized: Token missing or malformed');
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authenticateUser;
