import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/api/notifications', {
                withCredentials: true
            });
            
            if (response.data.success) {
                setNotifications(response.data.notifications);
                setUnreadCount(response.data.unreadCount);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Poll for new notifications every 10 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    // Mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`/api/notifications/${notificationId}/read`, {}, {
                withCredentials: true
            });
            fetchNotifications();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            setLoading(true);
            await axios.put('/api/notifications/mark-all-read', {}, {
                withCredentials: true
            });
            await fetchNotifications();
        } catch (error) {
            console.error('Error marking all as read:', error);
        } finally {
            setLoading(false);
        }
    };

    // Format timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div className="position-relative">
            {/* Notification Bell */}
            <button
                className="btn btn-light position-relative"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ borderRadius: '50%', width: '40px', height: '40px' }}
            >
                <i className="bi bi-bell-fill"></i>
                {unreadCount > 0 && (
                    <span 
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '10px' }}
                    >
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {showDropdown && (
                <div 
                    className="position-absolute end-0 mt-2 bg-white border rounded shadow-lg"
                    style={{ width: '350px', maxHeight: '500px', overflowY: 'auto', zIndex: 1000 }}
                >
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                        <h6 className="mb-0">Notifications</h6>
                        {unreadCount > 0 && (
                            <button 
                                className="btn btn-sm btn-link text-decoration-none"
                                onClick={markAllAsRead}
                                disabled={loading}
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div>
                        {notifications.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                <i className="bi bi-bell" style={{ fontSize: '48px' }}></i>
                                <p className="mt-2">No notifications</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-3 border-bottom ${!notif.read ? 'bg-light' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => !notif.read && markAsRead(notif.id)}
                                >
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center gap-2">
                                                <strong>{notif.title}</strong>
                                                {!notif.read && (
                                                    <span 
                                                        className="badge bg-primary"
                                                        style={{ fontSize: '8px' }}
                                                    >
                                                        NEW
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mb-1 small text-muted">{notif.message}</p>
                                            {notif.propertyName && (
                                                <p className="mb-1 small">
                                                    <strong>Property:</strong> {notif.propertyName}
                                                </p>
                                            )}
                                            {notif.travelerName && (
                                                <p className="mb-1 small">
                                                    <strong>Guest:</strong> {notif.travelerName}
                                                </p>
                                            )}
                                            {notif.checkIn && notif.checkOut && (
                                                <p className="mb-1 small">
                                                    <strong>Dates:</strong> {new Date(notif.checkIn).toLocaleDateString()} - {new Date(notif.checkOut).toLocaleDateString()}
                                                </p>
                                            )}
                                            {notif.totalPrice && (
                                                <p className="mb-1 small">
                                                    <strong>Total:</strong> ${notif.totalPrice}
                                                </p>
                                            )}
                                            <small className="text-muted">{formatTime(notif.timestamp)}</small>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-2 text-center border-top">
                            <button 
                                className="btn btn-sm btn-link text-decoration-none"
                                onClick={() => setShowDropdown(false)}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Backdrop */}
            {showDropdown && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ zIndex: 999 }}
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
}

export default NotificationBell;
