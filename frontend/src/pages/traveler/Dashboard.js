import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function TravelerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState({
        location: '',
        startDate: '',
        endDate: '',
        guests: 1
    });
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        acceptedBookings: 0
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/traveler/login');
        } else {
            setUser(JSON.parse(userData));
            fetchProperties();
            fetchBookingStats();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/traveler/properties/search`,
                { 
                    params: searchParams,
                    withCredentials: true 
                }
            );

            if (response.data.success) {
                setProperties(response.data.properties);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
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
                const bookings = response.data.bookings;
                setStats({
                    totalBookings: bookings.length,
                    pendingBookings: bookings.filter(b => b.status === 'pending').length,
                    acceptedBookings: bookings.filter(b => b.status === 'accepted').length
                });
            }
        } catch (error) {
            console.error('Error fetching booking stats:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProperties();
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/traveler/logout`,
                {},
                { withCredentials: true }
            );
            localStorage.removeItem('user');
            alert('Logged out successfully!');
            navigate('/traveler/login');
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('user');
            navigate('/traveler/login');
        }
    };

    const getFirstImage = (photos) => {
        if (!photos) return null;
        const photoArray = photos.split(',').filter(p => p.trim());
        return photoArray.length > 0 ? photoArray[0] : null;
    };

    if (!user) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand">
                         Airbnb 
                    </span>
                    <div className="d-flex align-items-center">
    <span className="text-white me-3">Welcome, {user.name}!</span>
    
    <div className="menu-container">
        <button className="menu-button">☰</button>
        <div className="dropdown-menu">
            <Link to="/traveler/profile" className="dropdown-item">My Profile</Link>
            <Link to="/traveler/bookings" className="dropdown-item">My Bookings</Link>
            <button onClick={handleLogout} className="dropdown-item border-0 bg-transparent w-100 text-start">
                Logout
            </button>
        </div>
    </div>
</div>

                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-4">
                {/* Welcome Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1 className="mb-3"></h1>
                        <p className="text-muted"></p>
                    </div>
                </div>
                {/* Search Form */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3"> Search Properties</h5>
                        <form onSubmit={handleSearch}>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Where are you going?"
                                        value={searchParams.location}
                                        onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Check-in</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={searchParams.startDate}
                                        onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Check-out</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={searchParams.endDate}
                                        onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
                                        min={searchParams.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Guests</label>
                                    <select
                                        className="form-select"
                                        value={searchParams.guests}
                                        onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                                    >
                                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-lg w-100">
                                         Search Properties
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <Link to="/traveler/bookings" className="text-decoration-none">
                            <div className="card shadow-sm h-100 hover-card">
                                <div className="card-body text-center">
                                    <div className="display-4 mb-3">📅</div>
                                    <h5 className="card-title">My Bookings</h5>
                                    <p className="text-muted small mb-0">
                                        View and manage your reservations
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/traveler/favorites" className="text-decoration-none">
                            <div className="card shadow-sm h-100 hover-card">
                                <div className="card-body text-center">
                                    <div className="display-4 mb-3">❤️</div>
                                    <h5 className="card-title">Favorites</h5>
                                    <p className="text-muted small mb-0">
                                        Properties you've saved
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/traveler/profile" className="text-decoration-none">
                            <div className="card shadow-sm h-100 hover-card">
                                <div className="card-body text-center">
                                    <div className="display-4 mb-3">👤</div>
                                    <h5 className="card-title">My Profile</h5>
                                    <p className="text-muted small mb-0">
                                        Update your information
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>
                            {searchParams.location ? `Properties in ${searchParams.location}` : 'Available Properties'}
                        </h4>
                        <span className="text-muted">{properties.length} properties found</span>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted">Loading properties...</p>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="alert alert-info text-center">
                            <h5>No properties found</h5>
                            <p className="mb-0">Try adjusting your search criteria or explore all available properties</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {properties.map(property => {
                                const firstImage = getFirstImage(property.photos);
                                
                                return (
                                    <div key={property.id} className="col-md-6 col-lg-4">
                                        <Link 
                                            to={`/traveler/properties/${property.id}`} 
                                            className="text-decoration-none"
                                        >
                                            <div className="card h-100 shadow-sm hover-shadow">
                                                {/* Property Image */}
                                                {firstImage ? (
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}${firstImage}`}
                                                        alt={property.name}
                                                        className="card-img-top"
                                                        style={{ 
                                                            height: '200px', 
                                                            objectFit: 'cover' 
                                                        }}
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                                                        style={{ height: '200px' }}
                                                    >
                                                        <span className="display-1">🏠</span>
                                                    </div>
                                                )}

                                                <div className="card-body">
                                                    <h5 className="card-title">{property.name}</h5>
                                                    <p className="text-muted mb-2">
                                                        📍 {property.location}
                                                    </p>
                                                    <p className="card-text small text-truncate">
                                                        {property.description || 'Beautiful property'}
                                                    </p>
                                                    
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <small className="text-muted">
                                                            {property.bedrooms} bed · {property.bathrooms} bath
                                                        </small>
                                                        <small className="text-muted">
                                                            {property.max_guests} guests max
                                                        </small>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <span className="h5 text-primary mb-0">
                                                                ${property.pricing}
                                                            </span>
                                                            <small className="text-muted"> / night</small>
                                                        </div>
                                                        <span className="badge bg-primary">
                                                            {property.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TravelerDashboard;