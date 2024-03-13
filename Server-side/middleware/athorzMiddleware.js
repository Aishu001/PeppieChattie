import jwt from 'jsonwebtoken';

const authenticateUser = async(req, res, next) => {
    // Check for Authorization header
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log the authorization header
    
    if (!authHeader && !authHeader.startsWith('Bearer ')) {
        console.log('Unauthorized: Token missing or malformed');
        return res.status(401).json({ message: 'Unauthorized' });
    }

     const token = authHeader.substring(7); // Remove the 'Bearer ' prefix
    console.log('Extracted Token:', token); // Log the extracted token
  try {
   const tokenD =   req.headers.authorization.split(" ")[1];
   await jwt.verify(tokenD, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err); // Log JWT verification error
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user =  user;
        next();
    });
} catch (e) {
    res.status(401);
      throw new Error("Not authorized, token failed");
}
};

export default authenticateUser;

