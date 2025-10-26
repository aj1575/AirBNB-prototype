import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OwnerDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/dashboard/stats`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setStats(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Dashboard error:', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="container mt-5">Loading dashboard...</div>;
    if (!stats) return <div className="container mt-5">Failed to load dashboard</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Owner Dashboard</h2>
                <Link to="/owner/properties/new" className="btn btn-primary">
                    + Add New Property
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h3 className="text-primary">{stats.stats.totalProperties}</h3>
                            <p className="text-muted mb-0">Total Properties</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h3 className="text-success">{stats.stats.acceptedBookings}</h3>
                            <p className="text-muted mb-0">Accepted Bookings</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h3 className="text-warning">{stats.stats.pendingBookings}</h3>
                            <p className="text-muted mb-0">Pending Requests</p>
                            {stats.stats.pendingBookings > 0 && (
                                <Link to="/owner/bookings" className="btn btn-sm btn-warning mt-2">
                                    View Requests
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h3 className="text-success">${stats.stats.totalRevenue.toFixed(2)}</h3>
                            <p className="text-muted mb-0">Total Revenue</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Requests Card */}
<div className="col-md-4">
    <Link to="/owner/bookings" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card h-100 shadow-sm" style={{ cursor: 'pointer' }}>
            <div className="card-body text-center">
                <h5 className="card-title">Booking Requests</h5>
                <p className="small">Manage booking requests</p>
                <button className="btn btn-primary">View Requests</button>
            </div>
        </div>
    </Link>
</div>

            {/* Upcoming Bookings */}
            {stats.upcomingBookings.length > 0 && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h5 className="mb-0">Upcoming Bookings</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Traveler</th>
                                        <th>Check-in</th>
                                        <th>Check-out</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.upcomingBookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td>{booking.property_name}</td>
                                            <td>{booking.traveler_name}</td>
                                            <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                                            <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                                            <td>${booking.total_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Properties */}
            {stats.topProperties.length > 0 && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h5 className="mb-0">Top Performing Properties</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Location</th>
                                        <th>Bookings</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.topProperties.map(property => (
                                        <tr key={property.id}>
                                            <td>
                                                <Link to={`/owner/properties/edit/${property.id}`}>
                                                    {property.name}
                                                </Link>
                                            </td>
                                            <td>{property.location}</td>
                                            <td>{property.booking_count}</td>
                                            <td>${parseFloat(property.revenue).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Activity */}
            {stats.recentBookings.length > 0 && (
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Recent Bookings</h5>
                        <Link to="/owner/bookings" className="btn btn-sm btn-outline-primary">
                            View All
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="list-group">
                            {stats.recentBookings.map(booking => (
                                <div key={booking.id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <strong>{booking.property_name}</strong>
                                            <p className="mb-1 text-muted small">
                                                Booked by {booking.traveler_name}
                                            </p>
                                            <small className="text-muted">
                                                {new Date(booking.created_at).toLocaleString()}
                                            </small>
                                        </div>
                                        <div className="text-end">
                                            <span className={`badge ${
                                                booking.status === 'accepted' ? 'bg-success' :
                                                booking.status === 'pending' ? 'bg-warning' : 'bg-danger'
                                            }`}>
                                                {booking.status.toUpperCase()}
                                            </span>
                                            <p className="mb-0 mt-1">${booking.total_price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="row mt-4">
                <div className="col-md-4">
                    <Link to="/owner/properties/new" className="btn btn-outline-primary w-100 mb-3">
                        + Add Property
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/owner/bookings" className="btn btn-outline-warning w-100 mb-3">
                        View Booking Requests
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/owner/profile" className="btn btn-outline-secondary w-100 mb-3">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;