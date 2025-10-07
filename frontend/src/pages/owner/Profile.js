import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        about_me: '',
        languages: '',
        gender: '',
        location: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/profile`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setProfile(response.data.user);
            }
            setLoading(false);
        } catch (error) {
            console.error('Fetch profile error:', error);
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

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/owner/profile`,
                profile,
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Profile updated successfully');
                setEditing(false);
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Owner Profile</h3>
                            {!editing && (
                                <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={profile.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={profile.phone || ''}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={profile.gender || ''}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={profile.city || ''}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            value={profile.country || ''}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">About Me</label>
                                        <textarea
                                            className="form-control"
                                            name="about_me"
                                            value={profile.about_me || ''}
                                            onChange={handleChange}
                                            rows="4"
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Languages</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="languages"
                                            value={profile.languages || ''}
                                            onChange={handleChange}
                                            placeholder="English, Spanish, etc."
                                            disabled={!editing}
                                        />
                                    </div>
                                </div>

                                {editing && (
                                    <div className="d-flex gap-2">
                                        <button 
                                            type="submit" 
                                            className="btn btn-success"
                                            disabled={saving}
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button 
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setEditing(false);
                                                fetchProfile();
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerProfile;