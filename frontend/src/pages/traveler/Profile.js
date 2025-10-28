import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getProfile, updateProfile } from '../../services/travelerApi';

function TravelerProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        languages: '',
        gender: '',
        about_me: '',
        profile_image: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // List of countries for dropdown
    const countries = [
        'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
        'France', 'Spain', 'Italy', 'Japan', 'China', 'India', 'Brazil',
        'Mexico', 'Argentina', 'South Korea', 'Singapore', 'Netherlands',
        'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Other'
    ];

    // Gender options
    const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            if (response.data.success) {
                setFormData(response.data.profile);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/traveler/login');
            } else {
                setError('Failed to load profile');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage) return;

        setUploadingImage(true);
        setError('');

        const formDataImg = new FormData();
        formDataImg.append('profile_image', selectedImage);

        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
            const response = await axios.post(
                `${API_URL}/api/traveler/profile/image`,
                formDataImg,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                setFormData({ ...formData, profile_image: response.data.imageUrl });
                setSuccess('Profile image updated!');
                setSelectedImage(null);
                setImagePreview(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await updateProfile(formData);
            if (response.data.success) {
                setSuccess('Profile updated successfully!');
                // Update localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                user.name = formData.name;
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>My Profile</h2>
                                <button 
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate('/traveler/dashboard')}
                                >
                                    Back to Dashboard
                                </button>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}

                            {/* Profile Image Section */}
                            <div className="text-center mb-4">
                                <div className="mb-3">
                                    {imagePreview ? (
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview"
                                            className="rounded-circle"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #6a11cb' }}
                                        />
                                    ) : formData.profile_image ? (
                                        <img 
                                            src={`${process.env.REACT_APP_API_URL}${formData.profile_image}`}
                                            alt="Profile"
                                            className="rounded-circle"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #6a11cb' }}
                                        />
                                    ) : (
                                        <div 
                                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: '150px', height: '150px', border: '3px solid #6a11cb' }}
                                        >
                                            <i className="bi bi-person-circle" style={{ fontSize: '80px', color: 'white' }}></i>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        id="profileImageInput"
                                        accept="image/jpeg,image/jpg,image/png"
                                        onChange={handleImageSelect}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="profileImageInput" className="btn btn-outline-primary btn-sm me-2">
                                        Choose Photo
                                    </label>
                                    {selectedImage && (
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={handleImageUpload}
                                            disabled={uploadingImage}
                                        >
                                            {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                                        </button>
                                    )}
                                </div>
                                <small className="text-muted">JPG, PNG (Max 5MB)</small>
                            </div>

                            <hr className="my-4" />

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email || ''}
                                            disabled
                                            style={{ backgroundColor: '#e9ecef' }}
                                        />
                                        <small className="text-muted">Email cannot be changed</small>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone || ''}
                                            onChange={handleChange}
                                            placeholder="123-456-7890"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={formData.gender || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            {genders.map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={formData.city || ''}
                                            onChange={handleChange}
                                            placeholder="San Francisco"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <select
                                            className="form-select"
                                            name="country"
                                            value={formData.country || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Languages</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="languages"
                                        value={formData.languages || ''}
                                        onChange={handleChange}
                                        placeholder="English, Spanish, French"
                                    />
                                    <small className="text-muted">Separate multiple languages with commas</small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">About Me</label>
                                    <textarea
                                        className="form-control"
                                        name="about_me"
                                        value={formData.about_me || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelerProfile;