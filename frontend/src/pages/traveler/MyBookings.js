import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, cancelBooking } from '../../services/travelerApi';
import AIChatbot from '../../components/traveler/AIChatbot';

function MyBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        fetchBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await getBookings(activeTab);
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

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                const response = await cancelBooking(bookingId);
                if (response.data.success) {
                    alert('Booking cancelled');
                    fetchBookings();
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
            cancelled: 'danger',
            completed: 'info'
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

            {error && <div className="alert alert-danger">{error}</div>}

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming
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
                        className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        Completed
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

                                    <p className="text-muted mb-2">Location: {booking.location}</p>

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
                                    {booking.status === 'completed' && (
                                        <div className="alert alert-info mb-0">
                                            ✓ Trip Completed - Thank you for staying!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* AI Chatbot */}
            <AIChatbot />
        </div>
    );
}

export default MyBookings;