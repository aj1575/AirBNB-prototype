import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchProperties } from '../../services/travelerApi';
import AIChatbot from '../../components/traveler/AIChatbot';

function TravelerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        propertyType: '',
        guests: 1
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/traveler/login');
        } else {
            setUser(JSON.parse(userData));
            fetchAllProperties();
        }
    }, [navigate]);

    useEffect(() => {
        applyFilters();
    }, [filters, properties]);

    const fetchAllProperties = async () => {
        try {
            setLoading(true);
            const response = await searchProperties({});
            if (response.data.success) {
                setProperties(response.data.properties);
                setFilteredProperties(response.data.properties);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...properties];

        if (filters.location) {
            filtered = filtered.filter(p => 
                p.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.propertyType) {
            filtered = filtered.filter(p => 
                p.type.toLowerCase() === filters.propertyType.toLowerCase()
            );
        }

        if (filters.guests > 1) {
            filtered = filtered.filter(p => p.max_guests >= filters.guests);
        }

        setFilteredProperties(filtered);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const clearFilters = () => {
        setFilters({
            location: '',
            propertyType: '',
            guests: 1
        });
    };

    if (!user) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" style={{color: '#6a11cb'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <h1 className="mb-4">Welcome, {user.name}!</h1>

            {/* Welcome Card */}
            <div className="alert" style={{background: 'linear-gradient(135deg, #6a11cb 0%, #7f53ac 100%)', color: 'white'}} role="alert">
                <h4 className="alert-heading">Welcome to your Traveler Dashboard!</h4>
                <p>Find your perfect stay and manage your bookings all in one place.</p>
            </div>

            {/* Quick Action Cards */}
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <div style={{fontSize: 48, marginBottom: 16}}>🔍</div>
                            <h5 className="card-title">Search Properties</h5>
                            <p className="text-muted">Find your perfect place to stay</p>
                            <Link to="/traveler/search" className="btn btn-primary" style={{background: '#6a11cb', border: 'none'}}>Start Searching</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <div style={{fontSize: 48, marginBottom: 16}}>📅</div>
                            <h5 className="card-title">My Bookings</h5>
                            <p className="text-muted">View and manage your reservations</p>
                            <Link to="/traveler/bookings" className="btn btn-primary" style={{background: '#6a11cb', border: 'none'}}>View Bookings</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <div style={{fontSize: 48, marginBottom: 16}}>❤️</div>
                            <h5 className="card-title">Favorites</h5>
                            <p className="text-muted">Save properties you love</p>
                            <Link to="/traveler/favorites" className="btn btn-primary" style={{background: '#6a11cb', border: 'none'}}>View Favorites</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Filters */}
            <div className="mt-5">
                <h3 className="mb-3">Browse All Properties</h3>
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label small fw-bold">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    placeholder="Search by location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold">Property Type</label>
                                <select
                                    className="form-select"
                                    name="propertyType"
                                    value={filters.propertyType}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Types</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="villa">Villa</option>
                                    <option value="condo">Condo</option>
                                    <option value="studio">Studio</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold">Guests</label>
                                <select
                                    className="form-select"
                                    name="guests"
                                    value={filters.guests}
                                    onChange={handleFilterChange}
                                >
                                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                        <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button className="btn btn-outline-secondary w-100" onClick={clearFilters}>Clear Filters</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                <p className="text-muted mb-3">{filteredProperties.length} properties available</p>
                
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" style={{color: '#6a11cb'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="alert alert-info text-center">
                        <h5>No properties found</h5>
                        <p>Try adjusting your filters</p>
                        <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredProperties.map(property => (
                            <div key={property.id} className="col-md-4 col-lg-3">
                                <div 
                                    className="card h-100 shadow-sm" 
                                    style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    onClick={() => navigate(`/traveler/property/${property.id}`)}
                                >
                                    <div className="bg-secondary" style={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <span style={{fontSize: 48}}>🏠</span>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title text-truncate">{property.name}</h6>
                                        <p className="text-muted small mb-1">📍 {property.location}</p>
                                        <p className="text-muted small mb-2">{property.type} · {property.bedrooms} bed · {property.bathrooms} bath</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-bold" style={{color: '#6a11cb'}}>${property.pricing}</span>
                                            <span className="small text-muted">/ night</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* AI Chatbot */}
            <AIChatbot />
        </div>
    );
}

export default TravelerDashboard;