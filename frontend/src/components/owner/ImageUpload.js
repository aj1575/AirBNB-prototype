import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ propertyId, existingImages = [], onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select images to upload');
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        setUploading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/owner/properties/${propertyId}/images`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                alert('Images uploaded successfully!');
                setSelectedFiles([]);
                setPreviewUrls([]);
                document.getElementById('imageInput').value = '';
                
                if (onUploadSuccess) {
                    onUploadSuccess(response.data.photos);
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert(error.response?.data?.message || 'Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (imageUrl) => {
        if (!window.confirm('Delete this image?')) return;

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/owner/properties/${propertyId}/images`,
                {
                    data: { imageUrl },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                alert('Image deleted successfully');
                if (onUploadSuccess) {
                    onUploadSuccess(response.data.photos);
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete image');
        }
    };

    const cancelSelection = () => {
        setSelectedFiles([]);
        setPreviewUrls([]);
        document.getElementById('imageInput').value = '';
    };

    return (
        <div className="image-upload-section mt-4">
            <h5>Property Images</h5>

            {/* Existing Images */}
            {existingImages.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-muted">Current Images ({existingImages.length})</h6>
                    <div className="row">
                        {existingImages.map((imageUrl, index) => (
                            <div key={index} className="col-md-3 col-6 mb-3">
                                <div className="position-relative">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                                        alt={`Property ${index + 1}`}
                                        className="img-fluid rounded"
                                        style={{ 
                                            width: '100%', 
                                            height: '200px', 
                                            objectFit: 'cover',
                                            border: '2px solid #dee2e6'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                        onClick={() => handleDelete(imageUrl)}
                                        style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Preview Selected Images */}
            {previewUrls.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-muted">Selected Images ({previewUrls.length})</h6>
                    <div className="row">
                        {previewUrls.map((url, index) => (
                            <div key={index} className="col-md-3 col-6 mb-3">
                                <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="img-fluid rounded"
                                    style={{ 
                                        width: '100%', 
                                        height: '200px', 
                                        objectFit: 'cover',
                                        border: '2px solid #0d6efd'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Form */}
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">
                            <strong>Upload New Images</strong>
                            <small className="text-muted ms-2">(Max 10, 5MB each)</small>
                        </label>
                        <input
                            id="imageInput"
                            type="file"
                            className="form-control"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onChange={handleFileSelect}
                            disabled={uploading}
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Uploading...
                                    </>
                                ) : (
                                    `Upload ${selectedFiles.length} Image${selectedFiles.length > 1 ? 's' : ''}`
                                )}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={cancelSelection}
                                disabled={uploading}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;