const express = require('express');
const router = express.Router();
const ownerController = require('../../controllers/ownerController');
const { isAuthenticated, isOwner } = require('../../middleware/auth');

// ========== AUTHENTICATION ==========
router.post('/signup', ownerController.signup);
router.post('/login', ownerController.login);
router.post('/logout', isAuthenticated, ownerController.logout);

// ========== PROFILE ==========
router.get('/profile', isAuthenticated, isOwner, ownerController.getProfile);
router.put('/profile', isAuthenticated, isOwner, ownerController.updateProfile);

// ========== PROPERTIES ==========
router.post('/properties', isAuthenticated, isOwner, ownerController.createProperty);
router.get('/properties', isAuthenticated, isOwner, ownerController.getOwnerProperties);
router.get('/properties/:id', isAuthenticated, isOwner, ownerController.getPropertyById);
router.put('/properties/:id', isAuthenticated, isOwner, ownerController.updateProperty);
router.delete('/properties/:id', isAuthenticated, isOwner, ownerController.deleteProperty);

// ========== IMAGE UPLOAD ==========
router.post(
    '/properties/:propertyId/images',
    isAuthenticated,
    isOwner,
    ownerController.upload.array('images', 10),
    ownerController.uploadPropertyImages
);

router.delete(
    '/properties/:propertyId/images',
    isAuthenticated,
    isOwner,
    ownerController.deletePropertyImage
);

// ========== BOOKINGS ==========
router.get('/bookings', isAuthenticated, isOwner, ownerController.getBookingRequests);
router.put('/bookings/:id/accept', isAuthenticated, isOwner, ownerController.acceptBooking);
router.put('/bookings/:id/cancel', isAuthenticated, isOwner, ownerController.cancelBooking);

// ========== DASHBOARD ==========
router.get('/dashboard/stats', isAuthenticated, isOwner, ownerController.getDashboardStats);

module.exports = router;