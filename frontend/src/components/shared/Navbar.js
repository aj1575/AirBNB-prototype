import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ownerProfile, setOwnerProfile] = useState(null);
    
    const isOwnerPage = location.pathname.startsWith('/owner');
    const isTravelerPage = location.pathname.startsWith('/traveler');
    const isHomePage = location.pathname === '/';
    const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/signup');

    useEffect(() => {
        if (isOwnerPage && !isAuthPage) {
            fetchOwnerProfile();
        }
    }, [isOwnerPage, isAuthPage]);

    const fetchOwnerProfile = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/owner/profile`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setOwnerProfile(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

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

    // Don't show navbar on home page or traveler pages
    if (isHomePage || isTravelerPage) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
            <div className="container">
                {/* Logo - Goes to Dashboard */}
                <Link 
                    to={isOwnerPage ? "/owner/dashboard" : isTravelerPage ? "/traveler/dashboard" : "/"} 
                    className="navbar-brand d-flex align-items-center"
                >
                    <img 
                        src="/airbnb_logo.png" 
                        alt="Airbnb Logo" 
                        style={{ height: '28px', marginRight: '8px' }} 
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <span style={{
                        fontFamily: 'Circular, "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontWeight: '600',
                        fontSize: '35px',
                        color: '#FF385C',
                        textTransform: 'lowercase',
                        letterSpacing: '0.5px'
                    }}>
                    </span>
                </Link>
                
                {/* Hamburger Toggle */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {/* Owner Navigation */}
                        {!isAuthPage && isOwnerPage && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fw-medium" to="/owner/dashboard">
                                        <i className="bi bi-speedometer2 me-1"></i>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fw-medium" to="/owner/bookings">
                                        <i className="bi bi-calendar-check me-1"></i>
                                        Bookings
                                    </Link>
                                </li>
                                
                                {/* Profile Dropdown */}
                                <li className="nav-item dropdown">
                                    <a 
                                        className="nav-link dropdown-toggle d-flex align-items-center text-dark fw-medium" 
                                        href="#" 
                                        id="profileDropdown" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        {/* Profile Picture or Initial */}
                                        {ownerProfile?.profile_picture ? (
                                            <img
                                                key={ownerProfile.profile_picture} // ✅ ensures re-render if image changes
                                                src={`${process.env.REACT_APP_API_URL}${ownerProfile.profile_picture}`}
                                                alt={ownerProfile.name}
                                                className="rounded-circle me-2"
                                                style={{ 
                                                    width: '32px', 
                                                    height: '32px', 
                                                    objectFit: 'cover',
                                                    border: '2px solid #FF385C'
                                                }}
                                                onError={(e) => {
                                                    // if image fails, trigger fallback render
                                                    e.target.onerror = null;
                                                    setOwnerProfile(prev => ({ ...prev, profile_picture: null }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="rounded-circle bg-primary text-white me-2 d-inline-flex align-items-center justify-content-center"
                                                style={{ 
                                                    width: '32px', 
                                                    height: '32px',
                                                }}
                                            >
                                                <span className="fw-bold" style={{ fontSize: '14px' }}>
                                                    {ownerProfile?.name?.charAt(0).toUpperCase() || 'O'}
                                                </span>
                                            </div>
                                        )}
                                        
                                        <span className="d-none d-lg-inline">{ownerProfile?.name || 'Owner'}</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/owner/profile">
                                                <i className="bi bi-person-circle me-2"></i>
                                                My Profile
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                        
                        {/* Auth Pages Navigation */}
                        {isAuthPage && (
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">
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
