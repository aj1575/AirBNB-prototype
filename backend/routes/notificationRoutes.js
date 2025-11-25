const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
};

// Get all notifications for logged-in owner
router.get('/', isAuthenticated, (req, res) => {
    try {
        const ownerId = req.session.userId;
        const unreadOnly = req.query.unreadOnly === 'true';
        
        const notifications = notificationService.getNotifications(ownerId, unreadOnly);
        const unreadCount = notificationService.getUnreadCount(ownerId);
        
        res.json({
            success: true,
            notifications,
            unreadCount
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
    }
});

// Get unread count
router.get('/unread-count', isAuthenticated, (req, res) => {
    try {
        const ownerId = req.session.userId;
        const unreadCount = notificationService.getUnreadCount(ownerId);
        
        res.json({
            success: true,
            unreadCount
        });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch unread count' });
    }
});

// Mark notification as read
router.put('/:id/read', isAuthenticated, (req, res) => {
    try {
        const ownerId = req.session.userId;
        const notificationId = parseInt(req.params.id);
        
        const success = notificationService.markAsRead(ownerId, notificationId);
        
        if (success) {
            res.json({ success: true, message: 'Notification marked as read' });
        } else {
            res.status(404).json({ success: false, message: 'Notification not found' });
        }
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ success: false, message: 'Failed to mark notification as read' });
    }
});

// Mark all as read
router.put('/mark-all-read', isAuthenticated, (req, res) => {
    try {
        const ownerId = req.session.userId;
        notificationService.markAllAsRead(ownerId);
        
        res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Error marking all as read:', error);
        res.status(500).json({ success: false, message: 'Failed to mark all as read' });
    }
});

// Clear all notifications
router.delete('/clear', isAuthenticated, (req, res) => {
    try {
        const ownerId = req.session.userId;
        notificationService.clearNotifications(ownerId);
        
        res.json({ success: true, message: 'All notifications cleared' });
    } catch (error) {
        console.error('Error clearing notifications:', error);
        res.status(500).json({ success: false, message: 'Failed to clear notifications' });
    }
});

module.exports = router;
