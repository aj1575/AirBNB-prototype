// Notification Service - Real-time alerts for owners
// Stores notifications in memory and provides API to fetch them

class NotificationService {
    constructor() {
        // In-memory storage for notifications (in production, use Redis or database)
        this.notifications = new Map(); // ownerId -> [notifications]
    }

    // Add notification for an owner
    addNotification(ownerId, notification) {
        if (!this.notifications.has(ownerId)) {
            this.notifications.set(ownerId, []);
        }

        const notif = {
            id: Date.now(),
            ...notification,
            timestamp: new Date(),
            read: false
        };

        this.notifications.get(ownerId).unshift(notif); // Add to beginning
        
        // Keep only last 50 notifications per owner
        if (this.notifications.get(ownerId).length > 50) {
            this.notifications.get(ownerId).pop();
        }

        console.log(`🔔 Notification added for owner ${ownerId}:`, notif.message);
        return notif;
    }

    // Get all notifications for an owner
    getNotifications(ownerId, unreadOnly = false) {
        const ownerNotifs = this.notifications.get(ownerId) || [];
        
        if (unreadOnly) {
            return ownerNotifs.filter(n => !n.read);
        }
        
        return ownerNotifs;
    }

    // Get unread count
    getUnreadCount(ownerId) {
        const ownerNotifs = this.notifications.get(ownerId) || [];
        return ownerNotifs.filter(n => !n.read).length;
    }

    // Mark notification as read
    markAsRead(ownerId, notificationId) {
        const ownerNotifs = this.notifications.get(ownerId) || [];
        const notif = ownerNotifs.find(n => n.id === notificationId);
        
        if (notif) {
            notif.read = true;
            return true;
        }
        
        return false;
    }

    // Mark all as read
    markAllAsRead(ownerId) {
        const ownerNotifs = this.notifications.get(ownerId) || [];
        ownerNotifs.forEach(n => n.read = true);
    }

    // Clear all notifications for owner
    clearNotifications(ownerId) {
        this.notifications.delete(ownerId);
    }
}

// Singleton instance
const notificationService = new NotificationService();

module.exports = notificationService;
