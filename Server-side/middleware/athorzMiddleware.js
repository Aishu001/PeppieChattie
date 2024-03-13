import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    // Check for Authorization header
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log the authorization header
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Log the extracted token

    if (!token) {
        console.log('Unauthorized: Token missing');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err); // Log JWT verification error
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

export default authenticateUser;
