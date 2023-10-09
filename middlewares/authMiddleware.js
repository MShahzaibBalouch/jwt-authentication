const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
}

function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '30m' });
}

module.exports = {
    authenticateToken,
    generateToken,
};
