import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { travelerApi } from '../../services/travelerApi';

function TravelerProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        about_me: '',
        languages: '',
        gender: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const fetchProfile = async () => {
        try {
            const response = await travelerApi.getProfile();
            if (response.success) {
                setProfile({
                    ...response.profile,
                    phone: response.profile.phone || '',
                    city: response.profile.city || '',
                    country: response.profile.country || '',
                    about_me: response.profile.about_me || '',
                    languages: response.profile.languages || '',
                    gender: response.profile.gender || ''
                });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/traveler/login');
            } else {
                setMessage({ type: 'danger', text: 'Failed to load profile' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await travelerApi.updateProfile(profile);
            if (response.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                // Update user name in localStorage
                const userData = JSON.parse(localStorage.getItem('user'));
                userData.name = profile.name;
                localStorage.setItem('user', JSON.stringify(userData));
            }
        } catch (err) {
            setMessage({ type: 'danger', text: 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/traveler/dashboard">
                        Airbnb - Traveler
                    </Link>
                    <div>
                        <Link to="/traveler/dashboard" className="btn btn-light btn-sm">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <h2 className="mb-4">My Profile</h2>

                                {message.text && (
                                    <div className={`alert alert-${message.type}`} role="alert">
                                        {message.text}
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
                                                value={profile.name}
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
                                                value={profile.email}
                                                disabled
                                            />
                                            <small className="text-muted">Email cannot be changed</small>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleChange}
                                                placeholder="123-456-7890"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Gender</label>
                                            <select
                                                className="form-select"
                                                name="gender"
                                                value={profile.gender}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="prefer_not_to_say">Prefer not to say</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                value={profile.city}
                                                onChange={handleChange}
                                                placeholder="San Francisco"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Country</label>
                                            <select
                                                className="form-select"
                                                name="country"
                                                value={profile.country}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Country</option>
                                                <option value="USA">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="India">India</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Languages</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="languages"
                                                value={profile.languages}
                                                onChange={handleChange}
                                                placeholder="English, Spanish, French"
                                            />
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">About Me</label>
                                            <textarea
                                                className="form-control"
                                                name="about_me"
                                                value={profile.about_me}
                                                onChange={handleChange}
                                                rows="4"
                                                placeholder="Tell us about yourself..."
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelerProfile;