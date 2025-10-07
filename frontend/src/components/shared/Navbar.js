import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const isOwnerPage = location.pathname.startsWith('/owner');
    const isTravelerPage = location.pathname.startsWith('/traveler');
    const isHomePage = location.pathname === '/';
    
    const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/signup');

    const handleLogout = async () => {
        try {
            const endpoint = isOwnerPage ? '/api/owner/logout' : '/api/traveler/logout';
            await axios.post(
                `${process.env.REACT_APP_API_URL}${endpoint}`,
                {},
                { withCredentials: true }
            );
            
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/');
        }
    };

    // Don't show navbar on home page
    if (isHomePage) {
        return null;
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark ${isOwnerPage ? 'bg-success' : 'bg-primary'}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-house-heart-fill me-2"></i>
                    Airbnb Prototype
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Owner Navigation */}
                        {!isAuthPage && isOwnerPage && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/owner/dashboard">
                                        <i className="bi bi-speedometer2 me-1"></i>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/owner/bookings">
                                        <i className="bi bi-calendar-check me-1"></i>
                                        Bookings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/owner/profile">
                                        <i className="bi bi-person-circle me-1"></i>
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        
                        {/* Traveler Navigation */}
                        {!isAuthPage && isTravelerPage && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/traveler/dashboard">
                                        <i className="bi bi-search me-1"></i>
                                        Search
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/traveler/profile">
                                        <i className="bi bi-person-circle me-1"></i>
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        
                        {/* Auth Pages Navigation */}
                        {isAuthPage && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back to Home
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;