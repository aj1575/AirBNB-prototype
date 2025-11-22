import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../../services/travelerApi';
import AIChatbot from '../../components/traveler/AIChatbot';

function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getFavorites();
            console.log('Favorites response:', response.data);
            if (response.data.success) {
                const favs = response.data.favorites || [];
                setFavorites(favs);
                console.log('Favorites loaded:', favs.length, 'properties');
                if (favs.length === 0) {
                    console.log('No favorites found - add some properties to favorites!');
                }
            } else {
                setError(response.data.message || 'Failed to load favorites');
            }
        } catch (err) {
            console.error('Error fetching favorites:', err);
            console.error('Error details:', err.response?.data);
            if (err.response?.status === 401) {
                // Session expired or not logged in - redirect to login
                alert('Your session has expired. Please login again.');
                localStorage.removeItem('user');
                navigate('/traveler/login');
            } else {
                setError(err.response?.data?.message || 'Failed to load favorites. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (propertyId) => {
        if (window.confirm('Remove from favorites?')) {
            try {
                await removeFavorite(propertyId);
                fetchFavorites();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to remove favorite');
            }
        }
    };

    const viewProperty = (propertyId) => {
        navigate(`/traveler/property/${propertyId}`);
    };

    return (
        <div className="container mt-4 mb-5">
            <button onClick={() => navigate('/traveler/dashboard')} className="btn btn-outline-secondary mb-3">
                ← Back to Dashboard
            </button>

            <h2 className="mb-4">My Favorites</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border" style={{color: '#6a11cb'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : favorites.length === 0 ? (
                <div className="alert alert-info text-center">
                    <h5>No favorites yet</h5>
                    <p>Start adding properties you love by clicking the heart icon on property details pages!</p>
                    <button onClick={() => navigate('/traveler/search')} className="btn btn-primary" style={{background: '#6a11cb', border: 'none'}}>
                        Browse Properties
                    </button>
                </div>
            ) : (
                <div className="row g-4">
                    {favorites.map(property => {
                        console.log('Property:', property.name, 'Images:', property.images);
                        const imageUrl = property.images && property.images.length > 0 
                            ? property.images[0] 
                            : null;
                        console.log('Image URL:', imageUrl);
                        
                        return (
                        <div key={property.id} className="col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm">
                                {imageUrl ? (
                                    <img 
                                        src={imageUrl}
                                        alt={property.name}
                                        style={{height: 200, objectFit: 'cover', cursor: 'pointer'}}
                                        onClick={() => viewProperty(property.id)}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div 
                                    className="bg-secondary" 
                                    style={{height: 200, display: imageUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
                                    onClick={() => viewProperty(property.id)}
                                >
                                    <span style={{fontSize: 48}}>No Image</span>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="card-title text-truncate mb-0" style={{cursor: 'pointer'}} onClick={() => viewProperty(property.id)}>
                                            {property.name}
                                        </h6>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveFavorite(property.id)}
                                            title="Remove from favorites"
                                        >
                                            ♥
                                        </button>
                                    </div>
                                    <p className="text-muted small mb-1">Location: {property.location}</p>
                                    <p className="text-muted small mb-2">
                                        {property.type} · {property.bedrooms} bed · {property.bathrooms} bath
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold" style={{color: '#6a11cb'}}>${property.pricing}</span>
                                        <span className="small text-muted">/ night</span>
                                    </div>
                                    <button 
                                        onClick={() => viewProperty(property.id)}
                                        className="btn btn-sm btn-outline-primary w-100 mt-2"
                                        style={{borderColor: '#6a11cb', color: '#6a11cb'}}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            )}

            <AIChatbot />
        </div>
    );
}

export default Favorites;
