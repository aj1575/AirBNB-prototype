const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Lab 2: MongoDB and Kafka
const { connectMongoDB } = require('./config/mongodb');
const { initKafka, closeKafka } = require('./kafka/kafkaConfig');
const { startBookingConsumer } = require('./kafka/bookingConsumer');

const app = express();

// CORS Configuration - Allow credentials for session management
app.use(cors({ 
    origin: ['http://localhost:3000', 'http://localhost:3001'],  // Lab 1 (3000) + Lab 2 Docker (3001)
    credentials: true 
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session Configuration (Lab 2: Use MongoDB store if MONGODB_URI is provided)
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'cmpe273_airbnb_secret_key_2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

// Lab 2: Use MongoDB for session storage if available
if (process.env.MONGODB_URI) {
    console.log('✅ Using MongoDB for session storage');
    sessionConfig.store = MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600 // Lazy session update
    });
}

app.use(session(sessionConfig));

// Log all requests (for debugging)
app.use((req, res, next) => {
    console.log('Session:', req.session);
    console.log('User ID:', req.session?.userId);
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Airbnb API is running!',
        version: '1.0.0',
        endpoints: {
            owner: {
                auth: '/api/owner/signup, /api/owner/login, /api/owner/logout',
                profile: '/api/owner/profile',
                properties: '/api/owner/properties',
                bookings: '/api/owner/bookings',
                dashboard: '/api/owner/dashboard/stats'
            },
            traveler: {
                auth: '/api/traveler/signup, /api/traveler/login, /api/traveler/logout',
                profile: '/api/traveler/profile',
                properties: '/api/traveler/properties/search',
                bookings: '/api/traveler/bookings',
                favorites: '/api/traveler/favorites',
                ai: '/api/traveler/ai-concierge'
            }
        }
    });
});

// Health Check Route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes - OWNER SIDE (Anurag)
try {
    const ownerRoutes = require('./routes/owner/ownerRoutes');
    app.use('/api/owner', ownerRoutes);
    console.log('✅ Owner routes loaded successfully');
} catch (error) {
    console.log('⚠️  Owner routes not found - will be available when implemented');
}

// API Routes - TRAVELER SIDE (Yuktaa)
try {
    const travelerRoutes = require('./routes/traveler/travelerRoutes');
    app.use('/api/traveler', travelerRoutes);
    console.log('✅ Traveler routes loaded successfully');
} catch (error) {
    console.log('⚠️  Traveler routes not found - will be available when implemented');
}

// API Routes - NOTIFICATIONS (Real-time alerts via Kafka)
try {
    const notificationRoutes = require('./routes/notificationRoutes');
    app.use('/api/notifications', notificationRoutes);
    console.log('✅ Notification routes loaded successfully');
} catch (error) {
    console.log('⚠️  Notification routes not found');
}

// 404 Handler - Route Not Found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);

    // Multer file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB per file'
        });
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
            success: false,
            message: 'Too many files. Maximum is 10 images'
        });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            success: false,
            message: 'Unexpected field in file upload'
        });
    }

    // MySQL errors
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            success: false,
            message: 'Duplicate entry. This record already exists'
        });
    }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            success: false,
            message: 'Invalid reference. Related record not found'
        });
    }

    if (err.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(400).json({
            success: false,
            message: 'Invalid field in database query'
        });
    }

    // Session errors
    if (err.message && err.message.includes('session')) {
        return res.status(401).json({
            success: false,
            message: 'Session error. Please login again'
        });
    }

    // Default error response
    res.status(err.status || 500).json({ 
        success: false, 
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? {
            stack: err.stack,
            details: err
        } : undefined
    });
});

// Lab 2: Initialize MongoDB and Kafka
(async () => {
    try {
        // Connect to MongoDB if URI is provided
        if (process.env.MONGODB_URI) {
            await connectMongoDB();
        }
        
        // Initialize Kafka if broker is provided
        if (process.env.KAFKA_BROKER) {
            await initKafka();
            await startBookingConsumer();
        }
    } catch (error) {
        console.error('❌ Failed to initialize Lab 2 services:', error.message);
        console.log('⚠️  Continuing with Lab 1 functionality only...');
    }
})();

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🚀 Airbnb API Server Started Successfully`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📦 Database: ${process.env.DB_NAME}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📚 Available Endpoints:`);
    console.log(`   Owner Side (Anurag):`);
    console.log(`   - POST   /api/owner/signup`);
    console.log(`   - POST   /api/owner/login`);
    console.log(`   - POST   /api/owner/logout`);
    console.log(`   - GET    /api/owner/profile`);
    console.log(`   - PUT    /api/owner/profile`);
    console.log(`   - POST   /api/owner/properties`);
    console.log(`   - GET    /api/owner/properties`);
    console.log(`   - GET    /api/owner/properties/:id`);
    console.log(`   - PUT    /api/owner/properties/:id`);
    console.log(`   - DELETE /api/owner/properties/:id`);
    console.log(`   - POST   /api/owner/properties/:id/images`);
    console.log(`   - DELETE /api/owner/properties/:id/images`);
    console.log(`   - GET    /api/owner/bookings`);
    console.log(`   - PUT    /api/owner/bookings/:id/accept`);
    console.log(`   - PUT    /api/owner/bookings/:id/cancel`);
    console.log(`   - GET    /api/owner/dashboard/stats`);
    console.log(``);
    console.log(`   Traveler Side (Yuktaa):`);
    console.log(`   - POST   /api/traveler/signup`);
    console.log(`   - POST   /api/traveler/login`);
    console.log(`   - POST   /api/traveler/logout`);
    console.log(`   - GET    /api/traveler/profile`);
    console.log(`   - PUT    /api/traveler/profile`);
    console.log(`   - GET    /api/traveler/properties/search`);
    console.log(`   - GET    /api/traveler/properties/:id`);
    console.log(`   - POST   /api/traveler/bookings`);
    console.log(`   - GET    /api/traveler/bookings`);
    console.log(`   - DELETE /api/traveler/bookings/:id`);
    console.log(`   - POST   /api/traveler/favorites/:propertyId`);
    console.log(`   - GET    /api/traveler/favorites`);
    console.log(`   - DELETE /api/traveler/favorites/:propertyId`);
    console.log(`   - POST   /api/traveler/ai-concierge`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`💡 Tip: Use Postman or curl to test APIs`);
    console.log(`📝 Logs: All requests will be logged here`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Graceful Shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    if (process.env.KAFKA_BROKER) {
        await closeKafka();
    }
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    if (process.env.KAFKA_BROKER) {
        await closeKafka();
    }
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

module.exports = app;