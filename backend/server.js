const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // set to true if using https
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Airbnb API is running!' });
});

// Routes (will be added by Yuktaa and Anurag separately)
app.use('/api/traveler', require('./routes/traveler/travelerRoutes'));  // Yuktaa will create
// app.use('/api/owner', require('./routes/owner/ownerRoutes'));           // Anurag will create

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});