const { db } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const [rows] = await db.execute(
        'SELECT id FROM users WHERE email = ? OR username = ?',
        [email, username]
      );
  
      if (rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [result] = await db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
  
      res.status(201).json({
        id: result.insertId,
        username,
        email
      });
  
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ error: 'Registration failed' });
    }
  };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const [users] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = users[0];
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '12h' }
        );
        
        res.json({ 
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};