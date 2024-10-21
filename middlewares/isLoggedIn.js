// middleware/auth.js
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        // Get the auth header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: 'No authorization header' });
        }

        // Split 'Bearer token' into ['Bearer', 'token']
        const parts = authHeader.split(' ');
        
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Invalid authorization format' });
        }

        const token = parts[1];
        
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user data to request object
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = isLoggedIn;