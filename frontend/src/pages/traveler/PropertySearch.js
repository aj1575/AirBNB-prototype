import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProperties } from '../../services/travelerApi';

function PropertySearch() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        location: '',
        startDate: '',
        endDate: '',
        guests: 1
    });
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSearched(true);

        try {
            const response = await searchProperties(searchParams);
            if (response.data.success) {
                setProperties(response.data.properties);
            }
        } catch (err) {
            setError('Error searching properties. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const viewDetails = (propertyId) => {
        navigate(`/traveler/property/${propertyId}`);
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="bg-primary text-white py-4">
                <div className="container">
                    <h1 className="mb-0">Find Your Perfect Stay</h1>
                </div>
            </div>

            {/* Search Form */}
            <div className="container mt-4">
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSearch}>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={searchParams.location}
                                        onChange={handleChange}
                                        placeholder="Where do you want to go?"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Check-in</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="startDate"
                                        value={searchParams.startDate}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Check-out</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="endDate"
                                        value={searchParams.endDate}
                                        onChange={handleChange}
                                        min={searchParams.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label">Guests</label>
                                    <select
                                        className="form-select"
                                        name="guests"
                                        value={searchParams.guests}
                                        onChange={handleChange}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-1 d-flex align-items-end">
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? '...' : 'Search'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {/* Results */}
                {searched && !loading && (
                    <div>
                        <h4 className="mb-3">
                            {properties.length > 0 
                                ? `${properties.length} ${properties.length === 1 ? 'Property' : 'Properties'} Found`
                                : 'No properties found'
                            }
                        </h4>

                        {properties.length === 0 && (
                            <div className="text-center py-5">
                                <h5 className="text-muted">No properties match your search</h5>
                                <p className="text-muted">Try adjusting your filters</p>
                            </div>
                        )}

                        <div className="row g-4">
                            {properties.map(property => (
                                <div key={property.id} className="col-md-6 col-lg-4">
                                    <div className="card h-100 shadow-sm hover-shadow" style={{ cursor: 'pointer' }}>
                                        <div 
                                            className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                                            style={{ height: '200px' }}
                                        >
                                            <span className="text-white display-4">🏠</span>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{property.name}</h5>
                                            <p className="text-muted mb-2">
                                                <i className="bi bi-geo-alt"></i> {property.location}
                                            </p>
                                            <p className="card-text small text-truncate">
                                                {property.description}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div>
                                                    <strong className="text-primary">${property.pricing}</strong>
                                                    <small className="text-muted"> / night</small>
                                                </div>
                                                <button 
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => viewDetails(property.id)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                            <div className="mt-2">
                                                <small className="text-muted">
                                                    {property.bedrooms} beds • {property.bathrooms} baths • {property.max_guests} guests
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Searching properties...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertySearch;