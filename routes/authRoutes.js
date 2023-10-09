const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
    // Replace this with your actual authentication logic
    const { username, password } = req.body;

    // Example: check username and password
    if (username === 'user' && password === 'password') {
        const user = { username };
        const token = authMiddleware.generateToken(user);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.get('/protected', authMiddleware.authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
