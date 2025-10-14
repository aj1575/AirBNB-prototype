import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../services/travelerApi';

function TravelerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/traveler/login');
        } else {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('user');
            alert('Logged out successfully!');
            navigate('/traveler/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local storage even if API call fails
            localStorage.removeItem('user');
            navigate('/traveler/login');
        }
    };

    if (!user) {
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
        <div className="container-fluid">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand">Airbnb - Traveler</span>
                    <div className="d-flex align-items-center">
                        <span className="text-white me-3">Welcome, {user.name}!</span>
                        <Link to="/traveler/profile" className="btn btn-outline-light btn-sm me-2">
                            Profile
                        </Link>
                        <button onClick={handleLogout} className="btn btn-light btn-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-4">
                <h1 className="mb-4">Dashboard</h1>

                {/* Welcome Card */}
                <div className="alert alert-info mb-4">
                    <h4 className="alert-heading">Welcome to your Traveler Dashboard!</h4>
                    <p>Property search and booking features will be added next.</p>
                </div>

                {/* Feature Cards */}
                <div className="row g-4">
                    
                    {/* Search Properties Card */}
                        <div className="col-md-4">

                            <div className="card h-100 shadow-sm">

                                <div className="card-body text-center">

                                    <h5 className="card-title">Search Properties</h5>
                                    <p className="small">Find your perfect place to stay</p>
                                    <Link to="/traveler/search" className="btn btn-primary">
                                       Start Searching
                                       </Link>
                                 </div>
                            </div>
                        </div>

                    {/* My Bookings Card */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title">My Bookings</h5>
                                <p className="text-muted">Coming soon...</p>
                                <p className="small">View and manage your reservations</p>
                            </div>
                        </div>
                    </div>

                    {/* Favorites Card */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title">Favorites</h5>
                                <p className="text-muted">Coming soon...</p>
                                <p className="small">Save properties you love</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-5">
                    <h4>Quick Actions</h4>
                    <div className="list-group">
                        <Link to="/traveler/profile" className="list-group-item list-group-item-action">
                            <strong>Edit Profile</strong>
                            <p className="mb-0 text-muted small">Update your personal information</p>
                        </Link>
                        <a href="#" className="list-group-item list-group-item-action disabled">
                            <strong>Search Properties</strong>
                            <p className="mb-0 text-muted small">Available in next update</p>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action disabled">
                            <strong>View Bookings</strong>
                            <p className="mb-0 text-muted small">Available in next update</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelerDashboard;