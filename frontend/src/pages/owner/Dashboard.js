import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OwnerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/properties`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setProperties(response.data.properties);
            }
            setLoading(false);
        } catch (error) {
            console.error('Fetch properties error:', error);
            setLoading(false);
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

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Owner Dashboard</h2>
                <Link to="/owner/properties/new" className="btn btn-success">
                    + Add New Property
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="alert alert-info">
                    No properties yet. <Link to="/owner/properties/new">Add your first property</Link>
                </div>
            ) : (
                <div className="row">
                    {properties.map(property => (
                        <div key={property.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{property.name}</h5>
                                    <p className="text-muted">
                                        <i className="bi bi-geo-alt"></i> {property.location}
                                    </p>
                                    <p><strong>${property.pricing}</strong> / night</p>
                                    <p className="small text-muted">
                                        {property.bedrooms} bed · {property.bathrooms} bath
                                    </p>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link 
                                            to={`/owner/properties/edit/${property.id}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(property.id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;