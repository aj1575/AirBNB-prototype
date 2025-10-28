import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../../components/owner/ImageUpload';
import LOCATIONS from '../../utils/locations';

const AddEditProperty = () => {
    const { id } = useParams(); // For edit mode
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        type: 'Apartment',
        location: '',
        description: '',
        pricing: '',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 1,
        amenities: [],
        available: true
    });

    const [loading, setLoading] = useState(false);
    const [propertyImages, setPropertyImages] = useState([]);

    const amenitiesList = ['WiFi', 'Kitchen', 'Parking', 'Pool', 'Gym', 'Pet Friendly', 'Air Conditioning', 'Heating', 'Washer', 'Dryer'];
    const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Studio', 'Townhouse'];

    useEffect(() => {
        if (isEditMode) {
            fetchProperty();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/properties/${id}`,
                { withCredentials: true }
            );

            if (response.data.success) {
                const property = response.data.property;
                setFormData({
                    ...property,
                    amenities: property.amenities ? property.amenities.split(',') : []
                });
                setPropertyImages(property.photos ? property.photos.split(',').filter(p => p) : []);
            }
        } catch (error) {
            alert('Failed to fetch property');
            navigate('/owner/dashboard');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox' && name === 'amenities') {
            const updatedAmenities = checked
                ? [...formData.amenities, value]
                : formData.amenities.filter(a => a !== value);
            setFormData({ ...formData, amenities: updatedAmenities });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditMode
                ? `${process.env.REACT_APP_API_URL}/api/owner/properties/${id}`
                : `${process.env.REACT_APP_API_URL}/api/owner/properties`;

            const method = isEditMode ? 'put' : 'post';

            const response = await axios[method](url, formData, { withCredentials: true });

            if (response.data.success) {
                alert(isEditMode ? 'Property updated successfully' : 'Property created successfully');
                navigate('/owner/dashboard');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to save property');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUploadSuccess = (updatedPhotos) => {
        setPropertyImages(updatedPhotos);
    };

    return (
        <div className="container mt-4 mb-5">
            <h2>{isEditMode ? 'Edit Property' : 'Add New Property'}</h2>
            
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Property Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Property Type *</label>
                        <select
                            className="form-select"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            {propertyTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">Location *</label>
                        <select
                            className="form-select"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a location</option>
                            {LOCATIONS.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label className="form-label">Price per Night ($) *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="pricing"
                            value={formData.pricing}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label className="form-label">Bedrooms *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label className="form-label">Bathrooms *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label className="form-label">Max Guests *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="max_guests"
                            value={formData.max_guests}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">Amenities</label>
                        <div className="row">
                            {amenitiesList.map(amenity => (
                                <div key={amenity} className="col-md-4 col-6">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="amenities"
                                            value={amenity}
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">{amenity}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="available"
                                checked={formData.available}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Available for booking</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                            {loading ? 'Saving...' : (isEditMode ? 'Update Property' : 'Create Property')}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate('/owner/dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>

            {/* Image Upload Section - Only shown in Edit Mode */}
            {isEditMode && (
                <div className="mt-5">
                    <hr />
                    <ImageUpload
                        propertyId={id}
                        existingImages={propertyImages}
                        onUploadSuccess={handleImageUploadSuccess}
                    />
                </div>
            )}
        </div>
    );
};

export default AddEditProperty;