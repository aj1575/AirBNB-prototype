// backend/routes/owner/ownerRoutes.js
const express = require('express');
const router = express.Router();
const ownerController = require('../../controllers/ownerController');
const { isAuthenticated, isOwner } = require('../../middleware/auth');

// Authentication routes (from Day 1)
router.post('/signup', ownerController.signup);
router.post('/login', ownerController.login);
router.post('/logout', isAuthenticated, ownerController.logout);

// Profile routes (from Day 1)
router.get('/profile', isAuthenticated, isOwner, ownerController.getProfile);
router.put('/profile', isAuthenticated, isOwner, ownerController.updateProfile);

// Property routes (Day 2)
router.post('/properties', isAuthenticated, isOwner, ownerController.createProperty);
router.get('/properties', isAuthenticated, isOwner, ownerController.getOwnerProperties);
router.get('/properties/:id', isAuthenticated, isOwner, ownerController.getPropertyById);
router.put('/properties/:id', isAuthenticated, isOwner, ownerController.updateProperty);
router.delete('/properties/:id', isAuthenticated, isOwner, ownerController.deleteProperty);

// Booking routes (Day 2)
router.get('/bookings', isAuthenticated, isOwner, ownerController.getBookingRequests);
router.put('/bookings/:id/accept', isAuthenticated, isOwner, ownerController.acceptBooking);
router.put('/bookings/:id/cancel', isAuthenticated, isOwner, ownerController.cancelBooking);

module.exports = router;