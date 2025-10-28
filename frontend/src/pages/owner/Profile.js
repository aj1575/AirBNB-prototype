import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OwnerProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        about_me: '',
        profile_picture: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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
                setProfileData(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (error.response?.status === 401) {
                navigate('/owner/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, or WebP)');
                return;
            }

            // Validate file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadProfilePicture = async () => {
        if (!selectedFile) {
            alert('Please select an image first');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        setUploading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/owner/profile/picture`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                alert('Profile picture updated successfully!');
                setProfileData({
                    ...profileData,
                    profile_picture: response.data.profilePicture
                });
                setSelectedFile(null);
                setPreviewUrl(null);
                // Clear file input
                document.getElementById('profilePictureInput').value = '';
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert(error.response?.data?.message || 'Failed to upload profile picture');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteProfilePicture = async () => {
        if (!window.confirm('Are you sure you want to delete your profile picture?')) {
            return;
        }

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/owner/profile/picture`,
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Profile picture deleted successfully');
                setProfileData({
                    ...profileData,
                    profile_picture: null
                });
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert(error.response?.data?.message || 'Failed to delete profile picture');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/owner/profile`,
                {
                    name: profileData.name,
                    phone: profileData.phone,
                    city: profileData.city,
                    country: profileData.country,
                    about_me: profileData.about_me
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
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

    return (
        <div className="container mt-4 mb-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>My Profile</h2>
                        <button 
                            onClick={() => navigate('/owner/dashboard')} 
                            className="btn btn-outline-secondary"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>

                    {/* Profile Picture Section */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Profile Picture</h5>
                            
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    {/* Current Profile Picture */}
                                    {profileData.profile_picture ? (
                                        <div className="position-relative d-inline-block">
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}${profileData.profile_picture}`}
                                                alt="Profile"
                                                className="rounded-circle img-thumbnail"
                                                style={{ 
                                                    width: '200px', 
                                                    height: '200px', 
                                                    objectFit: 'cover' 
                                                }}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                                                }}
                                            />
                                            <button
                                                onClick={handleDeleteProfilePicture}
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                                                style={{ width: '30px', height: '30px', padding: 0 }}
                                                title="Delete picture"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <div 
                                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: '200px', height: '200px' }}
                                        >
                                            <span className="display-1 text-white">
                                                {profileData.name?.charAt(0).toUpperCase() || '?'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-8">
                                    {/* Preview Selected Image */}
                                    {previewUrl && (
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Preview:</label>
                                            <div>
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="rounded-circle img-thumbnail"
                                                    style={{ 
                                                        width: '150px', 
                                                        height: '150px', 
                                                        objectFit: 'cover' 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Upload Form */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            {profileData.profile_picture ? 'Change Profile Picture' : 'Upload Profile Picture'}
                                        </label>
                                        <input
                                            id="profilePictureInput"
                                            type="file"
                                            className="form-control"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={handleFileSelect}
                                            disabled={uploading}
                                        />
                                        <small className="text-muted">
                                            Accepted formats: JPEG, PNG, WebP (Max 2MB)
                                        </small>
                                    </div>

                                    {selectedFile && (
                                        <div className="d-flex gap-2">
                                            <button
                                                onClick={handleUploadProfilePicture}
                                                className="btn btn-primary"
                                                disabled={uploading}
                                            >
                                                {uploading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    'Upload Picture'
                                                )}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setPreviewUrl(null);
                                                    document.getElementById('profilePictureInput').value = '';
                                                }}
                                                className="btn btn-secondary"
                                                disabled={uploading}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information Form */}
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Personal Information</h5>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email (Cannot be changed)</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={profileData.email}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={profileData.phone || ''}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={profileData.city || ''}
                                            onChange={handleChange}
                                            placeholder="San Francisco"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            value={profileData.country || ''}
                                            onChange={handleChange}
                                            placeholder="United States"
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label">About Me</label>
                                        <textarea
                                            className="form-control"
                                            name="about_me"
                                            value={profileData.about_me || ''}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            disabled={saving}
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="card shadow-sm mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Account Information</h5>
                            <p className="mb-1">
                                <strong>Account Type:</strong> Property Owner
                            </p>
                            <p className="mb-1">
                                <strong>Member Since:</strong>{' '}
                                {new Date(profileData.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerProfile;