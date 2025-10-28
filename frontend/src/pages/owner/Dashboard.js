import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OwnerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [stats, setStats] = useState(null);
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
        fetchProperties();
        fetchOwnerProfile();
    }, []);

    const fetchOwnerProfile = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/profile`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setOwnerProfile(response.data.user);
            }
        } catch (error) {
            console.error('Profile error:', error);
        }
    };

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

    const fetchProperties = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/properties`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setProperties(response.data.properties);
            }
        } catch (error) {
            console.error('Fetch properties error:', error);
        }
    };

    const handleDelete = async (propertyId) => {
        if (!window.confirm('Are you sure you want to delete this property?')) {
            return;
        }

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/owner/properties/${propertyId}`,
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Property deleted successfully');
                fetchProperties();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete property');
        }
    };

    if (loading) return <div className="container mt-5">Loading dashboard...</div>;
    if (!stats) return <div className="container mt-5">Failed to load dashboard</div>;

    return (
        <div className="container mt-4">
            {/* Welcome Section with Profile Picture - ONLY NEW ADDITION */}
            <div className="d-flex align-items-center mb-4">
                {ownerProfile?.profile_picture ? (
                    <img
                        src={`${process.env.REACT_APP_API_URL}${ownerProfile.profile_picture}`}
                        alt="Profile"
                        className="rounded-circle me-3"
                        style={{ 
                            width: '60px', 
                            height: '60px', 
                            objectFit: 'cover',
                            border: '3px solid #0d6efd'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div 
                        className="rounded-circle bg-primary text-white me-3 d-flex align-items-center justify-content-center"
                        style={{ 
                            width: '60px', 
                            height: '60px',
                            border: '3px solid #0d6efd'
                        }}
                    >
                        <span className="fs-4 fw-bold">
                            {ownerProfile?.name?.charAt(0).toUpperCase() || 'O'}
                        </span>
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center flex-grow-1">
                    <h2>Owner Dashboard</h2>
                    <Link to="/owner/properties/new" className="btn btn-primary">
                        + Add New Property
                    </Link>
                </div>
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

            {/* Properties List with Images */}
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Your Properties</h5>
                </div>
                <div className="card-body">
                    {properties.length === 0 ? (
                        <div className="alert alert-info">
                            No properties yet. <Link to="/owner/properties/new">Add your first property</Link>
                        </div>
                    ) : (
                        <div className="row">
                            {properties.map(property => {
                                const firstImage = property.photos ? property.photos.split(',').filter(p => p)[0] : null;
                                
                                return (
                                    <div key={property.id} className="col-md-6 col-lg-4 mb-4">
                                        <div className="card h-100 shadow-sm">
                                            {/* Property Image */}
                                            {firstImage ? (
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}${firstImage}`}
                                                    alt={property.name}
                                                    className="card-img-top"
                                                    style={{ 
                                                        height: '200px', 
                                                        objectFit: 'cover',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => window.location.href = `/owner/properties/edit/${property.id}`}
                                                />
                                            ) : (
                                                <div 
                                                    className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white"
                                                    style={{ height: '200px' }}
                                                >
                                                    <div className="text-center">
                                                        <i className="bi bi-image" style={{ fontSize: '3rem' }}></i>
                                                        <p className="mb-0 mt-2">No Image</p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="card-body">
                                                <h5 className="card-title">{property.name}</h5>
                                                <p className="text-muted mb-2">
                                                    <i className="bi bi-geo-alt"></i> {property.location}
                                                </p>
                                                <p className="card-text small text-muted">{property.type}</p>
                                                <p className="mb-2">
                                                    <strong className="text-primary">${property.pricing}</strong> / night
                                                </p>
                                                <p className="small text-muted mb-2">
                                                    {property.bedrooms} bed · {property.bathrooms} bath · {property.max_guests} guests
                                                </p>
                                                
                                                {/* Booking Stats */}
                                                <div className="mb-3">
                                                    <small className="text-muted">
                                                        {property.total_bookings || 0} total bookings
                                                        {property.pending_bookings > 0 && (
                                                            <span className="badge bg-warning ms-2">
                                                                {property.pending_bookings} pending
                                                            </span>
                                                        )}
                                                    </small>
                                                </div>

                                                <div className="mb-2">
                                                    <span className={`badge ${property.available ? 'bg-success' : 'bg-secondary'}`}>
                                                        {property.available ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </div>
                                                
                                                <div className="d-flex justify-content-between mt-3">
                                                    <Link 
                                                        to={`/owner/properties/edit/${property.id}`} 
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(property.id)}
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        <i className="bi bi-trash"></i> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Bookings */}
            {stats.upcomingBookings && stats.upcomingBookings.length > 0 && (
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
            {stats.topProperties && stats.topProperties.length > 0 && (
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
                                            <td>${parseFloat(property.revenue || 0).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Activity */}
            {stats.recentBookings && stats.recentBookings.length > 0 && (
                <div className="card mb-4">
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
            <div className="row mt-4 mb-4">
                <div className="col-md-4">
                    <Link to="/owner/properties/new" className="btn btn-outline-primary w-100 mb-3">
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Property
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/owner/bookings" className="btn btn-outline-warning w-100 mb-3">
                        <i className="bi bi-calendar-check me-2"></i>
                        View Booking Requests
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/owner/profile" className="btn btn-outline-secondary w-100 mb-3">
                        <i className="bi bi-person me-2"></i>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;