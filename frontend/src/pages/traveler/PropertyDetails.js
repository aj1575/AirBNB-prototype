import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyDetails, createBooking, addFavorite, removeFavorite, getFavorites } from '../../services/travelerApi';

function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingData, setBookingData] = useState({
        startDate: '',
        endDate: '',
        guests: 1
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await getPropertyDetails(id);
            if (response.data.success) {
                setProperty(response.data.property);
            }
            // Also fetch favorites to determine if this property is favorited
            try {
                const favRes = await getFavorites();
                if (favRes.data?.success && Array.isArray(favRes.data.favorites)) {
                    const exists = favRes.data.favorites.some(p => String(p.id) === String(id));
                    setIsFavorite(exists);
                }
            } catch (_) { /* ignore favorites fetch failure */ }
        } catch (err) {
            setError('Failed to load property details');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookingChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        
        if (!bookingData.startDate || !bookingData.endDate) {
            alert('Please select dates');
            return;
        }

        setBookingLoading(true);

        try {
            const response = await createBooking({
                propertyId: id,
                startDate: bookingData.startDate,
                endDate: bookingData.endDate,
                guests: parseInt(bookingData.guests)
            });

            if (response.data.success) {
                alert('Booking request created! Waiting for owner approval.');
                navigate('/traveler/dashboard');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    const toggleFavorite = async () => {
        if (!property || favLoading) return;
        setFavLoading(true);
        try {
            if (isFavorite) {
                await removeFavorite(property.id);
                setIsFavorite(false);
            } else {
                await addFavorite(property.id);
                setIsFavorite(true);
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update favorite');
        } finally {
            setFavLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error || 'Property not found'}</div>
                <button onClick={() => navigate('/traveler/search')} className="btn btn-primary">
                    Back to Search
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <button onClick={() => navigate('/traveler/search')} className="btn btn-outline-secondary mb-3">
                ← Back to Search
            </button>

            <div className="row">
                <div className="col-md-8">
                    {/* Property Image */}
                    <div className="bg-secondary rounded mb-4" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="display-1">🏠</span>
                    </div>

                    {/* Property Info */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <h2 className="mb-0">{property.name}</h2>
                                <button
                                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={toggleFavorite}
                                    disabled={favLoading}
                                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    {isFavorite ? '♥' : '♡'}
                                </button>
                            </div>
                            <p className="text-muted mb-3">
                                📍 {property.location}
                            </p>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h5>Details</h5>
                                    <ul>
                                        <li><strong>Type:</strong> {property.type}</li>
                                        <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                                        <li><strong>Bathrooms:</strong> {property.bathrooms}</li>
                                        <li><strong>Max Guests:</strong> {property.max_guests}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h5>Pricing</h5>
                                    <p className="display-5" style={{color:'#6a11cb'}}>${property.pricing}<span className="small"> / night</span></p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h5>Description</h5>
                                <p>{property.description || 'No description provided'}</p>
                            </div>

                            <div className="mb-3">
                                <h5>Amenities</h5>
                                <p>{property.amenities || 'No amenities listed'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="col-md-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body">
                            <h4 className="card-title">Book This Property</h4>
                            <p className="text-muted">${property.pricing} per night</p>

                            <form onSubmit={handleBooking}>
                                <div className="mb-3">
                                    <label className="form-label">Check-in Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="startDate"
                                        value={bookingData.startDate}
                                        onChange={handleBookingChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Check-out Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="endDate"
                                        value={bookingData.endDate}
                                        onChange={handleBookingChange}
                                        min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Number of Guests</label>
                                    <select
                                        className="form-select"
                                        name="guests"
                                        value={bookingData.guests}
                                        onChange={handleBookingChange}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100"
                                    style={{background:'#6a11cb', border:'none'}}
                                    disabled={bookingLoading}
                                >
                                    {bookingLoading ? 'Booking...' : 'Request Booking'}
                                </button>
                            </form>

                            <div className="alert alert-info mt-3 small">
                                <strong>Note:</strong> Your booking will be pending until the property owner approves it.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;