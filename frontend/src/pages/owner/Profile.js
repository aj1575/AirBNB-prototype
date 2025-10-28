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
        location: '',
        profile_picture: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

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

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage) return;

        setUploadingImage(true);
        const formData = new FormData();
        formData.append('profile_image', selectedImage);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/owner/profile/image`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                setProfile({ ...profile, profile_picture: response.data.imageUrl });
                alert('Profile image updated!');
                setSelectedImage(null);
                setImagePreview(null);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
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
                                    ) : profile.profile_picture ? (
                                        <img 
                                            src={`${process.env.REACT_APP_API_URL}${profile.profile_picture}`}
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
                                        id="ownerProfileImageInput"
                                        accept="image/jpeg,image/jpg,image/png"
                                        onChange={handleImageSelect}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="ownerProfileImageInput" className="btn btn-outline-primary btn-sm me-2">
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