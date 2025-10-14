import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        about_me: ''
    });

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