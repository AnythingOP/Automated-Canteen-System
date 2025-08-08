const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// --- User Registration ---
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --- User Login ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // --- DEBUGGING LOGS START ---
        console.log('--- Login Attempt ---');
        console.log('Username received:', username);
        console.log('Password received:', password);

        // Find user by username (case-insensitive for better UX)
        const user = await User.findOne({ username: new RegExp('^' + username + '$', 'i') });
        
        if (!user) {
            console.log('DEBUG: User not found in database.');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        console.log('DEBUG: User found in database:', user.username);
        
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log('DEBUG: Password comparison result (isMatch):', isMatch);
        // --- DEBUGGING LOGS END ---

        if (!isMatch) {
            console.log('DEBUG: Passwords do not match.');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('DEBUG: Login successful! Creating token...');
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;