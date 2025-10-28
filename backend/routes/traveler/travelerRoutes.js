const express = require('express');
const router = express.Router();
const db = require('../../models/db');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isAuthenticated, isTraveler } = require('../../middleware/auth');

// Multer config for profile images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads/profiles');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

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

// Upload Profile Image
router.post('/profile/image', isAuthenticated, isTraveler, upload.single('profile_image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No image file provided' 
            });
        }

        const imageUrl = `/uploads/profiles/${req.file.filename}`;

        // Update user's profile_picture in database
        await db.query(
            'UPDATE users SET profile_picture = ? WHERE id = ?',
            [imageUrl, req.session.userId]
        );

        res.json({ 
            success: true, 
            message: 'Profile image uploaded successfully',
            imageUrl: imageUrl
        });

    } catch (error) {
        console.error('Upload profile image error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error uploading profile image' 
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
            if (status === 'upcoming') {
                // Upcoming: accepted bookings with end_date >= today
                query += ' AND b.status = ? AND b.end_date >= CURDATE()';
                params.push('accepted');
            } else if (status === 'completed') {
                // Completed: accepted bookings with end_date < today
                query += ' AND b.status = ? AND b.end_date < CURDATE()';
                params.push('accepted');
            } else {
                // Regular status filter (pending, cancelled)
                query += ' AND b.status = ?';
                params.push(status);
            }
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

// ==================== AI CONCIERGE ROUTES ====================

// AI Travel Assistant
router.post('/ai-concierge', isAuthenticated, isTraveler, async (req, res) => {
    try {
        const { message, booking_context, preferences } = req.body;

        if (!message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a message' 
            });
        }

        // Try Python AI service first (if running on port 5002)
        const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5002';
        console.log(`Attempting to call Python AI service at ${AI_SERVICE_URL}`);
        try {
            const axios = require('axios');
            const aiResponse = await axios.post(
                `${AI_SERVICE_URL}/api/ai-concierge`,
                { message, booking_context, preferences },
                { timeout: 10000 }
            );
            
            console.log('Python AI service responded:', aiResponse.data.type || 'success');
            if (aiResponse.data && aiResponse.data.success) {
                return res.json(aiResponse.data);
            }
        } catch (aiError) {
            console.log('Python AI service not available, using fallback:', aiError.message);
        }

        // Optional: Try Hugging Face free inference API if HF_API_KEY is set
        // Get free key at https://huggingface.co/settings/tokens
        if (process.env.HF_API_KEY) {
            try {
                const axios = require('axios');
                const prompt = `You are a helpful travel booking assistant for an Airbnb-like platform. Answer concisely and actionably.\n\nUser: ${message}\nAssistant:`;
                
                const aiResp = await axios.post(
                    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
                    { inputs: prompt, parameters: { max_new_tokens: 200, temperature: 0.3 } },
                    { 
                        headers: { 'Authorization': `Bearer ${process.env.HF_API_KEY}` },
                        timeout: 8000
                    }
                );

                const content = aiResp.data?.[0]?.generated_text?.split('Assistant:')?.[1]?.trim();
                if (content && content.length > 10) {
                    return res.json({ success: true, response: content });
                }
            } catch (e) {
                console.warn('HF AI call failed, falling back to rule-based:', e.message);
            }
        }

        // Simple rule-based responses (you can integrate OpenAI API here later)
        let response = '';

        const lowerMessage = message.toLowerCase();

        // PRIORITIZE date change/modify intents before generic booking
        if (
            lowerMessage.includes('modify') ||
            lowerMessage.includes('change') ||
            lowerMessage.includes('resched') ||
            lowerMessage.includes('date') ||
            lowerMessage.includes('check-in') ||
            lowerMessage.includes('check in') ||
            lowerMessage.includes('check-out') ||
            lowerMessage.includes('check out') ||
            lowerMessage.includes('extend') ||
            lowerMessage.includes('shorten')
        ) {
            response = 'To change booking dates: If your booking is pending, cancel it from My Bookings and submit a new request with the updated dates. If already accepted, please contact the host from the booking details to request a change. Availability is not guaranteed until the host confirms.';
        } else if (lowerMessage.includes('cancel')) {
            response = 'You can cancel pending bookings from the "My Bookings" page. Just click on the booking and select "Cancel Request". Note that once a booking is accepted, cancellation policies may apply. Contact the host for accepted bookings.';
        } else if (lowerMessage.includes('favorite') || lowerMessage.includes('favourite') || lowerMessage.includes('heart') || lowerMessage.includes('save')) {
            response = 'Open a property\'s details page and click the heart icon to add it to Favorites. You can remove it by clicking the heart again.';
        } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
            response = 'Payment is processed securely after the owner accepts your booking request. We accept all major credit cards and digital payment methods. You\'ll receive a confirmation email with payment details.';
        } else if (lowerMessage.includes('host') || lowerMessage.includes('owner') || lowerMessage.includes('contact')) {
            response = 'You can contact the host through the property details page or after your booking is accepted. We provide a secure messaging system to communicate with property owners.';
        } else if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
            response = 'Use our search page to find properties! You can filter by location, dates, number of guests, price range, and amenities. Each property shows detailed photos, descriptions, and reviews.';
        } else if (lowerMessage.includes('review') || lowerMessage.includes('rating')) {
            response = 'After your stay, you can leave a review for the property. Reviews help other travelers make informed decisions and help hosts improve their service.';
        } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
            response = 'I\'m here to help! You can ask me about: booking properties, cancellation policies, payment methods, contacting hosts, modifying bookings, searching for properties, and more. What would you like to know?';
        } else if (lowerMessage.includes('book') || lowerMessage.includes('booking')) {
            response = 'To book a property: 1) Search for properties on the Search page, 2) Open a property you like, 3) Select your dates and guests, 4) Click "Request Booking". Track status in My Bookings.';
        } else {
            response = 'I can help you with booking questions, property searches, cancellations, payments, favorites, and more. Could you please be more specific about what you need help with?';
        }

        res.json({ 
            success: true, 
            response 
        });

    } catch (error) {
        console.error('AI concierge error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error processing your request' 
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
        console.log('Fetching favorites for user:', req.session.userId);
        
        const [favorites] = await db.query(
            `SELECT p.*, f.created_at as favorited_at 
             FROM favorites f
             JOIN properties p ON f.property_id = p.id
             WHERE f.user_id = ?
             ORDER BY f.created_at DESC`,
            [req.session.userId]
        );

        console.log('Found', favorites.length, 'favorites');

        // Fetch images for each property
        for (let property of favorites) {
            try {
                // First check if property has images field (some properties store as JSON)
                if (property.images && typeof property.images === 'string') {
                    try {
                        property.images = JSON.parse(property.images);
                        console.log('Property', property.id, 'parsed images from JSON:', property.images);
                    } catch (e) {
                        property.images = [];
                    }
                } else {
                    // Fetch from property_images table
                    const [images] = await db.query(
                        'SELECT image_path FROM property_images WHERE property_id = ? ORDER BY display_order',
                        [property.id]
                    );
                    property.images = images.map(img => img.image_path);
                    console.log('Property', property.id, 'fetched', images.length, 'images from table');
                }
                
                // If still no images, set empty array
                if (!property.images || property.images.length === 0) {
                    console.log('Property', property.id, 'has NO images');
                    property.images = [];
                }
            } catch (imgError) {
                console.error('Error fetching images for property', property.id, ':', imgError);
                property.images = []; // Set empty array if image fetch fails
            }
        }

        console.log('Sending', favorites.length, 'favorites with images');
        
        res.json({ 
            success: true, 
            favorites 
        });

    } catch (error) {
        console.error('Get favorites error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching favorites: ' + error.message 
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