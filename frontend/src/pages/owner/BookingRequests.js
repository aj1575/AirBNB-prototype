import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingRequests = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, [filter]);

    const fetchBookings = async () => {
        try {
            const url = filter === 'all'
                ? '/api/owner/bookings'
                : `/api/owner/bookings?status=${filter}`;

            const response = await axios.get(url, { withCredentials: true });

            if (response.data.success) {
                setBookings(response.data.bookings);
            }
            setLoading(false);
        } catch (error) {
            console.error('Fetch bookings error:', error);
            setLoading(false);
        }
    };

    const handleAccept = async (bookingId) => {
        try {
            const response = await axios.put(
                `/api/owner/bookings/${bookingId}/accept`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Booking accepted successfully');
                fetchBookings();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to accept booking');
        }
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            const response = await axios.put(
                `/api/owner/bookings/${bookingId}/cancel`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Booking cancelled successfully');
                fetchBookings();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-warning',
            accepted: 'bg-success',
            cancelled: 'bg-danger'
        };
        return badges[status] || 'bg-secondary';
    };
    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Booking Requests</h2>

            {/* Filter Tabs */}
            <ul className="nav nav-tabs mt-4 mb-3">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({bookings.length})
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${filter === 'accepted' ? 'active' : ''}`}
                        onClick={() => setFilter('accepted')}
                    >
                        Accepted
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${filter === 'cancelled' ? 'active' : ''}`}
                        onClick={() => setFilter('cancelled')}
                    >
                        Cancelled
                    </button>
                </li>
            </ul>

            {/* Bookings List */}
            {bookings.length === 0 ? (
                <div className="alert alert-info">No booking requests found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Property</th>
                                <th>Traveler</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Guests</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>
                                        <strong>{booking.property_name}</strong>
                                        <br />
                                        <small className="text-muted">{booking.property_location}</small>
                                    </td>
                                    <td>
                                        {booking.traveler_name}
                                        <br />
                                        <small className="text-muted">{booking.traveler_email}</small>
                                        <br />
                                        <small className="text-muted">{booking.traveler_phone}</small>
                                    </td>
                                    <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                                    <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                                    <td>{booking.guests}</td>
                                    <td>${booking.total_price}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(booking.status)}`}>
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        {booking.status === 'pending' && (
                                            <>
                                                <button 
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() => handleAccept(booking.id)}
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleCancel(booking.id)}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'accepted' && (
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleCancel(booking.id)}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        {booking.status === 'cancelled' && (
                                            <span className="text-muted">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingRequests;
    