const pool = require('../models/db');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ========== MULTER CONFIG ==========

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads/properties');
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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and WebP allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// ========== AUTHENTICATION ==========

const signup = async (req, res) => {
    try {
        const { name, email, password, phone, city, country } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email, and password' 
            });
        }

        const [existingUser] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already registered' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO users (name, email, password, role, phone, city, country)
            VALUES (?, ?, ?, 'owner', ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            name, email, hashedPassword, phone || null, city || null, country || null
        ]);

        res.status(201).json({
            success: true,
            message: 'Owner registered successfully',
            userId: result.insertId
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to register owner' 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND role = "owner"',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

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
            message: 'Login failed' 
        });
    }
};

const logout = (req, res) => {
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
};

// ========== PROFILE ==========

const getProfile = async (req, res) => {
    try {
        const userId = req.session.userId;

        const [users] = await pool.execute(
            'SELECT id, name, email, phone, city, country, profile_picture, about_me, languages, gender, location, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.json({
            success: true,
            user: users[0]
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch profile' 
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { name, phone, city, country, about_me, languages, gender, location } = req.body;

        const query = `
            UPDATE users 
            SET name = ?, phone = ?, city = ?, country = ?, 
                about_me = ?, languages = ?, gender = ?, location = ?
            WHERE id = ?
        `;

        await pool.execute(query, [
            name, phone, city, country, about_me, languages, gender, location, userId
        ]);

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update profile' 
        });
    }
};

// ========== PROPERTIES ==========

const createProperty = async (req, res) => {
    try {
        const ownerId = req.session.userId;
        const { name, type, location, description, pricing, bedrooms, bathrooms, amenities, max_guests } = req.body;

        if (!name || !type || !location || !pricing || !bedrooms || !bathrooms) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide all required fields' 
            });
        }

        const query = `
            INSERT INTO properties 
            (owner_id, name, type, location, description, pricing, bedrooms, bathrooms, amenities, max_guests, available)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)
        `;

        const amenitiesStr = Array.isArray(amenities) ? amenities.join(',') : amenities;
        
        const [result] = await pool.execute(query, [
            ownerId, name, type, location, description, pricing, 
            bedrooms, bathrooms, amenitiesStr, max_guests || 1
        ]);

        res.status(201).json({
            success: true,
            message: 'Property created successfully',
            propertyId: result.insertId
        });
    } catch (error) {
        console.error('Create property error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create property' 
        });
    }
};

const getOwnerProperties = async (req, res) => {
    try {
        const ownerId = req.session.userId;

        const query = `
            SELECT 
                p.*,
                COUNT(DISTINCT b.id) as total_bookings,
                COUNT(DISTINCT CASE WHEN b.status = 'pending' THEN b.id END) as pending_bookings
            FROM properties p
            LEFT JOIN bookings b ON p.id = b.property_id
            WHERE p.owner_id = ?
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `;

        const [properties] = await pool.execute(query, [ownerId]);

        res.json({
            success: true,
            properties: properties
        });
    } catch (error) {
        console.error('Get properties error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch properties' 
        });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.session.userId;

        const query = `
            SELECT * FROM properties 
            WHERE id = ? AND owner_id = ?
        `;

        const [properties] = await pool.execute(query, [id, ownerId]);

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
            message: 'Failed to fetch property' 
        });
    }
};

const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.session.userId;
        const { name, type, location, description, pricing, bedrooms, bathrooms, amenities, max_guests, available } = req.body;

        const [existing] = await pool.execute(
            'SELECT id FROM properties WHERE id = ? AND owner_id = ?',
            [id, ownerId]
        );

        if (existing.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Property not found or unauthorized' 
            });
        }

        const amenitiesStr = Array.isArray(amenities) ? amenities.join(',') : amenities;

        const query = `
            UPDATE properties 
            SET name = ?, type = ?, location = ?, description = ?, 
                pricing = ?, bedrooms = ?, bathrooms = ?, amenities = ?, 
                max_guests = ?, available = ?
            WHERE id = ? AND owner_id = ?
        `;

        await pool.execute(query, [
            name, type, location, description, pricing, 
            bedrooms, bathrooms, amenitiesStr, max_guests, 
            available !== undefined ? available : true, id, ownerId
        ]);

        res.json({
            success: true,
            message: 'Property updated successfully'
        });
    } catch (error) {
        console.error('Update property error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update property' 
        });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.session.userId;

        const [bookings] = await pool.execute(
            'SELECT id FROM bookings WHERE property_id = ? AND status = "accepted" AND end_date >= CURDATE()',
            [id]
        );

        if (bookings.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cannot delete property with active bookings' 
            });
        }

        const [result] = await pool.execute(
            'DELETE FROM properties WHERE id = ? AND owner_id = ?',
            [id, ownerId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Property not found' 
            });
        }

        res.json({
            success: true,
            message: 'Property deleted successfully'
        });
    } catch (error) {
        console.error('Delete property error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete property' 
        });
    }
};

// ========== IMAGE UPLOAD ==========

const uploadPropertyImages = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const ownerId = req.session.userId;

        const [property] = await pool.execute(
            'SELECT id, photos FROM properties WHERE id = ? AND owner_id = ?',
            [propertyId, ownerId]
        );

        if (property.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Property not found or unauthorized' 
            });
        }

        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'No images uploaded' 
            });
        }

        const imageUrls = files.map(file => `/uploads/properties/${file.filename}`);
        const existingPhotos = property[0].photos ? property[0].photos.split(',') : [];
        const allPhotos = [...existingPhotos, ...imageUrls];

        await pool.execute(
            'UPDATE properties SET photos = ? WHERE id = ?',
            [allPhotos.join(','), propertyId]
        );

        res.json({
            success: true,
            message: 'Images uploaded successfully',
            photos: allPhotos
        });
    } catch (error) {
        console.error('Upload images error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to upload images' 
        });
    }
};

const deletePropertyImage = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { imageUrl } = req.body;
        const ownerId = req.session.userId;

        const [property] = await pool.execute(
            'SELECT id, photos FROM properties WHERE id = ? AND owner_id = ?',
            [propertyId, ownerId]
        );

        if (property.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Property not found or unauthorized' 
            });
        }

        const photos = property[0].photos ? property[0].photos.split(',') : [];
        const updatedPhotos = photos.filter(photo => photo !== imageUrl);

        await pool.execute(
            'UPDATE properties SET photos = ? WHERE id = ?',
            [updatedPhotos.join(','), propertyId]
        );

        const filePath = path.join(__dirname, '..', imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({
            success: true,
            message: 'Image deleted successfully',
            photos: updatedPhotos
        });
    } catch (error) {
        console.error('Delete image error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete image' 
        });
    }
};

// ========== BOOKINGS ==========

const getBookingRequests = async (req, res) => {
    try {
        const ownerId = req.session.userId;
        const { status } = req.query;

        let query = `
            SELECT 
                b.*,
                p.name as property_name,
                p.location as property_location,
                u.name as traveler_name,
                u.email as traveler_email,
                u.phone as traveler_phone
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            JOIN users u ON b.traveler_id = u.id
            WHERE p.owner_id = ?
        `;

        const params = [ownerId];

        if (status) {
            query += ' AND b.status = ?';
            params.push(status);
        }

        query += ' ORDER BY b.created_at DESC';

        const [bookings] = await pool.execute(query, params);

        res.json({
            success: true,
            bookings: bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch bookings' 
        });
    }
};

const acceptBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.session.userId;

        const [booking] = await pool.execute(`
            SELECT b.*, p.owner_id 
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            WHERE b.id = ? AND p.owner_id = ?
        `, [id, ownerId]);

        if (booking.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found or unauthorized' 
            });
        }

        if (booking[0].status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: `Booking is already ${booking[0].status}` 
            });
        }

        await pool.execute(
            'UPDATE bookings SET status = "accepted" WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Booking accepted successfully'
        });
    } catch (error) {
        console.error('Accept booking error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to accept booking' 
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.session.userId;

        const [booking] = await pool.execute(`
            SELECT b.*, p.owner_id 
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            WHERE b.id = ? AND p.owner_id = ?
        `, [id, ownerId]);

        if (booking.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found or unauthorized' 
            });
        }

        if (booking[0].status === 'cancelled') {
            return res.status(400).json({ 
                success: false, 
                message: 'Booking is already cancelled' 
            });
        }

        await pool.execute(
            'UPDATE bookings SET status = "cancelled" WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to cancel booking' 
        });
    }
};

// ========== DASHBOARD ==========

const getDashboardStats = async (req, res) => {
    try {
        const ownerId = req.session.userId;

        const [properties] = await pool.execute(
            'SELECT COUNT(*) as total FROM properties WHERE owner_id = ?',
            [ownerId]
        );

        const [bookings] = await pool.execute(`
            SELECT 
                COUNT(*) as total_bookings,
                SUM(CASE WHEN b.status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN b.status = 'accepted' THEN 1 ELSE 0 END) as accepted,
                SUM(CASE WHEN b.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN b.status = 'accepted' THEN b.total_price ELSE 0 END) as total_revenue
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            WHERE p.owner_id = ?
        `, [ownerId]);

        const [upcomingBookings] = await pool.execute(`
            SELECT 
                b.*,
                p.name as property_name,
                u.name as traveler_name
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            JOIN users u ON b.traveler_id = u.id
            WHERE p.owner_id = ? AND b.status = 'accepted' AND b.start_date >= CURDATE()
            ORDER BY b.start_date ASC
            LIMIT 5
        `, [ownerId]);

        const [recentBookings] = await pool.execute(`
            SELECT 
                b.*,
                p.name as property_name,
                u.name as traveler_name
            FROM bookings b
            JOIN properties p ON b.property_id = p.id
            JOIN users u ON b.traveler_id = u.id
            WHERE p.owner_id = ?
            ORDER BY b.created_at DESC
            LIMIT 5
        `, [ownerId]);

        const [topProperties] = await pool.execute(`
            SELECT 
                p.id,
                p.name,
                p.location,
                COUNT(b.id) as booking_count,
                SUM(CASE WHEN b.status = 'accepted' THEN b.total_price ELSE 0 END) as revenue
            FROM properties p
            LEFT JOIN bookings b ON p.id = b.property_id
            WHERE p.owner_id = ?
            GROUP BY p.id
            ORDER BY booking_count DESC
            LIMIT 5
        `, [ownerId]);

        res.json({
            success: true,
            stats: {
                totalProperties: properties[0].total,
                totalBookings: bookings[0].total_bookings || 0,
                pendingBookings: bookings[0].pending || 0,
                acceptedBookings: bookings[0].accepted || 0,
                cancelledBookings: bookings[0].cancelled || 0,
                totalRevenue: parseFloat(bookings[0].total_revenue) || 0
            },
            upcomingBookings,
            recentBookings,
            topProperties
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch dashboard stats' 
        });
    }
};

// ========== EXPORTS ==========

module.exports = {
    // Authentication
    signup,
    login,
    logout,
    
    // Profile
    getProfile,
    updateProfile,
    
    // Properties
    createProperty,
    getOwnerProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    
    // Image Upload
    upload,
    uploadPropertyImages,
    deletePropertyImage,
    
    // Bookings
    getBookingRequests,
    acceptBooking,
    cancelBooking,
    
    // Dashboard
    getDashboardStats
};