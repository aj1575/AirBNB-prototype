const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../models/db');
const { isAuthenticated, isTraveler } = require('../../middleware/auth');

// @route   POST /api/traveler/signup
// @desc    Register a new traveler
// @access  Public
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email, and password' 
            });
        }

        // Check if user already exists
        const [existingUser] = await db.query(
            'SELECT id FROM users WHERE email = ?', 
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already registered' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 'traveler']
        );

        res.status(201).json({ 
            success: true, 
            message: 'Traveler account created successfully',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during signup' 
        });
    }
});

// @route   POST /api/traveler/login
// @desc    Login traveler
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // Find user
        const [users] = await db.query(
            'SELECT id, name, email, password, role FROM users WHERE email = ? AND role = ?',
            [email, 'traveler']
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Create session
        req.session.userId = user.id;
        req.session.role = user.role;
        req.session.email = user.email;

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login' 
        });
    }
});

// @route   POST /api/traveler/logout
// @desc    Logout traveler
// @access  Private
router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Logout failed' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    });
});

// @route   GET /api/traveler/profile
// @desc    Get traveler profile
// @access  Private
router.get('/profile', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, phone, city, country, profile_picture, about_me, languages, gender FROM users WHERE id = ?',
            [req.session.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.json({ 
            success: true, 
            profile: users[0] 
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   PUT /api/traveler/profile
// @desc    Update traveler profile
// @access  Private
router.put('/profile', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const { name, phone, city, country, about_me, languages, gender } = req.body;

        await db.query(
            'UPDATE users SET name = ?, phone = ?, city = ?, country = ?, about_me = ?, languages = ?, gender = ? WHERE id = ?',
            [name, phone, city, country, about_me, languages, gender, req.session.userId]
        );

        res.json({ 
            success: true, 
            message: 'Profile updated successfully' 
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

module.exports = router;