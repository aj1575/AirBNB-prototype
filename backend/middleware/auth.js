// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Please login.' 
    });
};

// Middleware to check if user is a traveler
const isTraveler = (req, res, next) => {
    if (req.session && req.session.role === 'traveler') {
        return next();
    }
    return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Travelers only.' 
    });
};

// Middleware to check if user is an owner
const isOwner = (req, res, next) => {
    if (req.session && req.session.role === 'owner') {
        return next();
    }
    return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Owners only.' 
    });
};

module.exports = { 
    isAuthenticated, 
    isTraveler, 
    isOwner 
};