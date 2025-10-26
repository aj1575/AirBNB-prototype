import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [location]);
    
    const isOwnerPage = location.pathname.startsWith('/owner');
    const isTravelerPage = location.pathname.startsWith('/traveler');
    const isHomePage = location.pathname === '/';
    
    const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/signup');

    const handleLogout = async () => {
        try {
            const endpoint = isOwnerPage ? '/api/owner/logout' : '/api/traveler/logout';
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}${endpoint}`, {}, { withCredentials: true });
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        }
    };

    // Don't show navbar on home page
    if (isHomePage) {
        return null;
    }

    // Owner: keep green header; Traveler: custom purple header with search and menu
    if (isOwnerPage) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <i className="bi bi-house-heart-fill me-2"></i>
                        Airbnb Prototype
                    </Link>
                    <div className="ms-auto d-flex align-items-center gap-3">
                        <Link className="nav-link text-white" to="/owner/dashboard">Dashboard</Link>
                        <Link className="nav-link text-white" to="/owner/bookings">Bookings</Link>
                        <Link className="nav-link text-white" to="/owner/profile">Profile</Link>
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        );
    }

    // Traveler purple header inspired by Airbnb
    return (
        <header style={{
            background: 'linear-gradient(135deg, #6a11cb 0%, #7f53ac 100%)',
            color: 'white'
        }}>
            <div className="container py-3 d-flex align-items-center justify-content-between">
                <Link to="/traveler/dashboard" className="text-white text-decoration-none fw-bold">
                    <i className="bi bi-heart-fill me-2"></i>
                    Airbnb Prototype
                </Link>

                {/* Centered search pill */}
                {!isAuthPage && (
                    <div className="flex-grow-1 d-none d-md-flex justify-content-center px-3">
                        <div className="bg-white text-dark rounded-pill shadow-sm d-flex align-items-center px-3" style={{maxWidth: 680, width: '100%', height: 48}}>
                            <input className="form-control border-0 rounded-pill me-2" placeholder="Where" />
                            <div className="vr mx-2"/>
                            <input className="form-control border-0 rounded-pill me-2" placeholder="Check in - Check out" />
                            <div className="vr mx-2"/>
                            <input className="form-control border-0 rounded-pill me-2" placeholder="Who" />
                            <button className="btn btn-primary rounded-circle" style={{background:'#6a11cb', border:'none', width:36, height:36}}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                )}

                {/* User menu */}
                <div className="d-flex align-items-center gap-2">
                    <Link to="/owner/login" className="btn btn-light text-dark rounded-pill px-3">
                        Become a host
                    </Link>
                    <div className="dropdown">
                        <button className="btn btn-light rounded-pill px-3 d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                            <i className="bi bi-person-circle"></i>
                            {user && <span className="small">{user.name}</span>}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {user && <li><h6 className="dropdown-header">Hello, {user.name}!</h6></li>}
                            <li><Link className="dropdown-item" to="/traveler/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
                            <li><Link className="dropdown-item" to="/traveler/bookings"><i className="bi bi-calendar-check me-2"></i>My bookings</Link></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;