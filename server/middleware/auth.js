const jwt = require('jsonwebtoken');
const { db } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if(!token) {
            throw new Error('Authentication required');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const [user] = await db.execute('SELECT id, username, email FROM users WHERE id = ?', [decoded.id]);

        if(!user.length) {
            throw new Error('User not found');
        }

        req.user = user[0];
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};