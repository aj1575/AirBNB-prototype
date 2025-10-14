const express = require('express');
const router = express.Router();
const db = require('../../models/db');
const bcrypt = require('bcrypt');
const { isAuthenticated, isTraveler } = require('../../middleware/auth');

// ==================== AUTHENTICATION ROUTES ====================

// Traveler Signup
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

        // Check if email already exists
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
            message: 'Traveler registered successfully',
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

// Traveler Login
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
            'SELECT * FROM users WHERE email = ? AND role = ?',
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
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Create session
        req.session.userId = user.id;
        req.session.role = user.role;
        req.session.name = user.name;

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

// Traveler Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error logging out' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    });
});

// ==================== PROFILE ROUTES ====================

// Get Traveler Profile
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
            message: 'Error fetching profile' 
        });
    }
});

// Update Traveler Profile
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
            message: 'Error updating profile' 
        });
    }
});

// ==================== PROPERTY SEARCH ROUTES ====================

// Search Properties
router.get('/properties/search', async (req, res) => {
    try {
        const { location, startDate, endDate, guests } = req.query;

        let query = 'SELECT * FROM properties WHERE available = true';
        const params = [];

        if (location) {
            query += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }

        if (guests) {
            query += ' AND max_guests >= ?';
            params.push(parseInt(guests));
        }

        // If dates provided, exclude properties with conflicting bookings
        if (startDate && endDate) {
            query += ` AND id NOT IN (
                SELECT property_id FROM bookings 
                WHERE status = 'accepted' 
                AND NOT (end_date < ? OR start_date > ?)
            )`;
            params.push(startDate, endDate);
        }

        const [properties] = await db.query(query, params);

        res.json({ 
            success: true, 
            properties 
        });

    } catch (error) {
        console.error('Search properties error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error searching properties' 
        });
    }
});

// Get Property Details
router.get('/properties/:id', async (req, res) => {
    try {
        const [properties] = await db.query(
            'SELECT * FROM properties WHERE id = ?',
            [req.params.id]
        );

        if (properties.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Property not found' 
            });
        }

        res.json({ 
            success: true, 
            property: properties[0] 
        });

    } catch (error) {
        console.error('Get property error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching property' 
        });
    }
});

// ==================== BOOKING ROUTES ====================

// Create Booking
router.post('/bookings', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const { propertyId, startDate, endDate, guests } = req.body;

        // Validation
        if (!propertyId || !startDate || !endDate || !guests) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide all booking details' 
            });
        }

        // Check if property exists and is available
        const [properties] = await db.query(
            'SELECT * FROM properties WHERE id = ? AND available = true',
            [propertyId]
        );

        if (properties.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Property not available' 
            });
        }

        const property = properties[0];

        // Check if dates are available (no accepted bookings overlap)
        const [conflicts] = await db.query(
            `SELECT id FROM bookings 
             WHERE property_id = ? AND status = 'accepted'
             AND NOT (end_date < ? OR start_date > ?)`,
            [propertyId, startDate, endDate]
        );

        if (conflicts.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Property not available for selected dates' 
            });
        }

        // Calculate total price
        const start = new Date(startDate);
        const end = new Date(endDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * property.pricing;

        // Create booking
        const [result] = await db.query(
            'INSERT INTO bookings (property_id, traveler_id, start_date, end_date, guests, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [propertyId, req.session.userId, startDate, endDate, guests, totalPrice, 'pending']
        );

        res.status(201).json({ 
            success: true, 
            message: 'Booking request created',
            bookingId: result.insertId,
            status: 'pending'
        });

    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating booking' 
        });
    }
});

// Get Traveler's Bookings
router.get('/bookings', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const { status } = req.query;

        let query = `
            SELECT b.*, p.name as property_name, p.location, p.photos 
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            WHERE b.traveler_id = ?
        `;
        const params = [req.session.userId];

        if (status) {
            query += ' AND b.status = ?';
            params.push(status);
        }

        query += ' ORDER BY b.created_at DESC';

        const [bookings] = await db.query(query, params);

        res.json({ 
            success: true, 
            bookings 
        });

    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching bookings' 
        });
    }
});

// Cancel Booking
router.delete('/bookings/:id', isAuthenticated, isTraveler, async (req, res) => {
    try {
        // Check if booking belongs to traveler
        const [bookings] = await db.query(
            'SELECT * FROM bookings WHERE id = ? AND traveler_id = ?',
            [req.params.id, req.session.userId]
        );

        if (bookings.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }

        // Update status to cancelled
        await db.query(
            'UPDATE bookings SET status = ? WHERE id = ?',
            ['cancelled', req.params.id]
        );

        res.json({ 
            success: true, 
            message: 'Booking cancelled successfully' 
        });

    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error cancelling booking' 
        });
    }
});

// ==================== FAVORITES ROUTES ====================

// Add to Favorites
router.post('/favorites/:propertyId', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const { propertyId } = req.params;

        // Check if already favorited
        const [existing] = await db.query(
            'SELECT id FROM favorites WHERE user_id = ? AND property_id = ?',
            [req.session.userId, propertyId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Property already in favorites' 
            });
        }

        // Add to favorites
        await db.query(
            'INSERT INTO favorites (user_id, property_id) VALUES (?, ?)',
            [req.session.userId, propertyId]
        );

        res.status(201).json({ 
            success: true, 
            message: 'Added to favorites' 
        });

    } catch (error) {
        console.error('Add favorite error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error adding to favorites' 
        });
    }
});

// Get Favorites
router.get('/favorites', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const [favorites] = await db.query(
            `SELECT p.*, f.created_at as favorited_at 
             FROM favorites f
             JOIN properties p ON f.property_id = p.id
             WHERE f.user_id = ?
             ORDER BY f.created_at DESC`,
            [req.session.userId]
        );

        res.json({ 
            success: true, 
            favorites 
        });

    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching favorites' 
        });
    }
});

// Remove from Favorites
router.delete('/favorites/:propertyId', isAuthenticated, isTraveler, async (req, res) => {
    try {
        await db.query(
            'DELETE FROM favorites WHERE user_id = ? AND property_id = ?',
            [req.session.userId, req.params.propertyId]
        );

        res.json({ 
            success: true, 
            message: 'Removed from favorites' 
        });

    } catch (error) {
        console.error('Remove favorite error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error removing from favorites' 
        });
    }
});

module.exports = router;