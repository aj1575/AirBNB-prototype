import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ownerApi from '../../services/ownerApi';

function BookingManagement() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('pending');

    useEffect(() => {
        fetchBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await ownerApi.getBookings(activeTab);
            if (res.data.success) {
                setBookings(res.data.bookings || []);
            } else {
                setBookings([]);
            }
        } catch (e) {
            console.error('Owner getBookings error:', e);
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (id) => {
        try {
            await ownerApi.acceptBooking(id);
            fetchBookings();
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to accept booking');
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this booking?')) return;
        try {
            await ownerApi.cancelBooking(id);
            fetchBookings();
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to cancel booking');
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <button onClick={() => navigate('/owner/dashboard')} className="btn btn-outline-secondary mb-3">
                ← Back to Dashboard
            </button>

            <h2 className="mb-4">Booking Requests</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <ul className="nav nav-tabs mb-4">
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
                    No {activeTab} bookings
                </div>
            ) : (
                <div className="row g-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="col-md-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title">{booking.property_name}</h5>
                                        <span className={`badge bg-${
                                            booking.status === 'pending' ? 'warning' : booking.status === 'accepted' ? 'success' : 'danger'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <p className="text-muted mb-2">📍 {booking.property_location || booking.location}</p>
                                    <div className="row mb-2">
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
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-success w-50" onClick={() => handleAccept(booking.id)}>
                                                Accept
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger w-50" onClick={() => handleCancel(booking.id)}>
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    {booking.status === 'accepted' && (
                                        <button className="btn btn-sm btn-outline-danger w-100" onClick={() => handleCancel(booking.id)}>
                                            Cancel Booking
                                        </button>
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

export default BookingManagement;