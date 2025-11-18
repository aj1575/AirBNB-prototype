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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await getPropertyDetails(id);
            if (response.data.success) {
                setProperty(response.data.property);
            }
            // Check if this property is in favorites
            checkIfFavorite();
        } catch (err) {
            setError('Failed to load property details');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const checkIfFavorite = async () => {
        try {
            const favRes = await getFavorites();
            if (favRes.data?.success && Array.isArray(favRes.data.favorites)) {
                const exists = favRes.data.favorites.some(p => String(p.id) === String(id));
                console.log('Is property favorited?', exists, 'Property ID:', id);
                setIsFavorite(exists);
            }
        } catch (err) {
            console.log('Could not check favorites:', err.message);
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
                console.log('Removing from favorites:', property.id);
                const response = await removeFavorite(property.id);
                console.log('Remove favorite response:', response.data);
                if (response.data.success) {
                    setIsFavorite(false);
                    alert('Removed from favorites!');
                }
            } else {
                console.log('Adding to favorites:', property.id);
                const response = await addFavorite(property.id);
                console.log('Add favorite response:', response.data);
                if (response.data.success) {
                    setIsFavorite(true);
                    alert('Added to favorites! Check "My Favorites" page.');
                    // Re-check favorites to ensure state is correct
                    setTimeout(() => checkIfFavorite(), 500);
                }
            }
        } catch (err) {
            console.error('Favorite error:', err);
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

    const propertyImages = property.photos ? property.photos.split(',') : [];
    const firstImage = propertyImages[0];
    const imageUrl = firstImage ? `${process.env.REACT_APP_API_URL}${firstImage}` : null;

    return (
        <div className="container mt-4 mb-5">
            <button onClick={() => navigate('/traveler/dashboard')} className="btn btn-outline-secondary mb-3">
                ← Back to Dashboard
            </button>

            <div className="row">
                <div className="col-md-8">
                    {/* Property Images */}
                    {imageUrl ? (
                        <div className="mb-4">
                            <img 
                                src={imageUrl} 
                                alt={property.name}
                                className="w-100 rounded"
                                style={{ height: '400px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="bg-secondary rounded" style={{ height: '400px', display: 'none', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="display-1">No Image</span>
                            </div>
                            {propertyImages.length > 1 && (
                                <div className="row g-2 mt-2">
                                    {propertyImages.slice(1, 5).map((img, idx) => (
                                        <div key={idx} className="col-3">
                                            <img 
                                                src={`${process.env.REACT_APP_API_URL}${img}`}
                                                alt={`${property.name} ${idx + 2}`}
                                                className="w-100 rounded"
                                                style={{ height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-secondary rounded mb-4" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="display-1">No Image</span>
                        </div>
                    )}

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
                                Location: {property.location}
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
                                        {Array.from({ length: property.max_guests || 1 }, (_, i) => i + 1).map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                    <small className="text-muted">Maximum {property.max_guests || 1} guest{property.max_guests > 1 ? 's' : ''} allowed</small>
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