import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, cancelBooking } from '../../services/travelerApi';
import axios from 'axios';

function MyBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // Default to "All"

    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        acceptedBookings: 0
    });

    useEffect(() => {
        fetchBookings();
        fetchBookingStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchBookings = async () => {
        try {
            setLoading(true);

            let response;
            if (activeTab === 'all') {
                // fetch all bookings directly
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/traveler/bookings`,
                    { withCredentials: true }
                );
            } else {
                // use existing filtered API
                response = await getBookings(activeTab);
            }

            if (response.data.success) {
                setBookings(response.data.bookings);
            }
        } catch (err) {
            setError('Failed to load bookings');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookingStats = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/traveler/bookings`,
                { withCredentials: true }
            );
            if (response.data.success) {
                const all = response.data.bookings;
                setStats({
                    totalBookings: all.length,
                    pendingBookings: all.filter(b => b.status === 'pending').length,
                    acceptedBookings: all.filter(b => b.status === 'accepted').length
                });
            }
        } catch (err) {
            console.error('Error fetching booking stats:', err);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                const response = await cancelBooking(bookingId);
                if (response.data.success) {
                    alert('Booking cancelled');
                    fetchBookings();
                    fetchBookingStats();
                }
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to cancel booking');
            }
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            pending: 'warning',
            accepted: 'success',
            cancelled: 'danger'
        };
        return (
            <span className={`badge bg-${colors[status] || 'secondary'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="container mt-4 mb-5">
            <button onClick={() => navigate('/traveler/dashboard')} className="btn btn-outline-secondary mb-3">
                ← Back to Dashboard
            </button>

            <h2 className="mb-4">My Bookings</h2>

            {/* 📊 Booking Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card bg-primary text-white shadow-sm">
                        <div className="card-body text-center">
                            <h2 className="mb-0">{stats.totalBookings}</h2>
                            <p className="mb-0">Total Bookings</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-dark shadow-sm">
                        <div className="card-body text-center">
                            <h2 className="mb-0">{stats.pendingBookings}</h2>
                            <p className="mb-0">Pending Requests</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white shadow-sm">
                        <div className="card-body text-center">
                            <h2 className="mb-0">{stats.acceptedBookings}</h2>
                            <p className="mb-0">Confirmed Stays</p>
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* 🗂️ Tabs Section */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'accepted' ? 'active' : ''}`}
                        onClick={() => setActiveTab('accepted')}
                    >
                        Accepted
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cancelled')}
                    >
                        Cancelled
                    </button>
                </li>
            </ul>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : bookings.length === 0 ? (
                <div className="alert alert-info text-center">
                    No {activeTab} bookings yet
                </div>
            ) : (
                <div className="row g-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="col-md-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title">{booking.property_name}</h5>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    <p className="text-muted mb-2">📍 {booking.location}</p>

                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <small className="text-muted">Check-in</small>
                                            <p className="mb-0">{new Date(booking.start_date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted">Check-out</small>
                                            <p className="mb-0">{new Date(booking.end_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <small className="text-muted">Guests</small>
                                            <p className="mb-0">{booking.guests}</p>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted">Total Price</small>
                                            <p className="mb-0 fw-bold">${booking.total_price}</p>
                                        </div>
                                    </div>

                                    {booking.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            className="btn btn-sm btn-outline-danger w-100"
                                        >
                                            Cancel Request
                                        </button>
                                    )}
                                    {booking.status === 'accepted' && (
                                        <div className="alert alert-success mb-0">
                                            ✓ Booking Confirmed!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;
