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
            const response = await getFavorites();
            if (response.data.success) {
                setFavorites(response.data.favorites || []);
            }
        } catch (err) {
            setError('Failed to load favorites');
            console.error('Error:', err);
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

            <h2 className="mb-4">My Favorites ❤️</h2>

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
                    {favorites.map(property => (
                        <div key={property.id} className="col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm">
                                <div 
                                    className="bg-secondary" 
                                    style={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
                                    onClick={() => viewProperty(property.id)}
                                >
                                    <span style={{fontSize: 48}}>🏠</span>
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
                                    <p className="text-muted small mb-1">📍 {property.location}</p>
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
                    ))}
                </div>
            )}

            <AIChatbot />
        </div>
    );
}

export default Favorites;
