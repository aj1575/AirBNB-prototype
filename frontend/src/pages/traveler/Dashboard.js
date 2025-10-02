import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { travelerApi } from '../../services/travelerApi';

function TravelerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/traveler/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await travelerApi.logout();
            localStorage.removeItem('user');
            navigate('/');
        } catch (err) {
            console.error('Logout error:', err);
            // Still navigate even if API call fails
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-vh-100 bg-light">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/traveler/dashboard">
                        Airbnb - Traveler
                    </Link>
                    <div className="d-flex align-items-center">
                        <span className="text-white me-3">Welcome, {user.name}!</span>
                        <Link to="/traveler/profile" className="btn btn-light btn-sm me-2">
                            Profile
                        </Link>
                        <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="mb-4">Dashboard</h1>
                        
                        <div className="alert alert-info">
                            <h4>Welcome to your Traveler Dashboard!</h4>
                            <p className="mb-0">
                                Property search and booking features will be added next.
                            </p>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h5>Search Properties</h5>
                                        <p className="text-muted">Coming soon...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h5>My Bookings</h5>
                                        <p className="text-muted">Coming soon...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h5>Favorites</h5>
                                        <p className="text-muted">Coming soon...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelerDashboard;