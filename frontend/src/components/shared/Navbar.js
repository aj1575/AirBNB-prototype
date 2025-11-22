import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    const isOwnerPage = location.pathname.startsWith('/owner');
    const isHomePage = location.pathname === '/';
    const isLoginOrSignupPage = location.pathname.includes('/login') || location.pathname.includes('/signup');

    const handleLogout = async () => {
        const role = isOwnerPage ? 'owner' : 'traveler';
        await dispatch(logoutUser(role));
        navigate('/');
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
                    <Link className="navbar-brand" to={isLoginOrSignupPage ? "/" : "/owner/dashboard"}>
                        <i className="bi bi-house-heart-fill me-2"></i>
                        Airbnb Prototype
                    </Link>
                    <div className="ms-auto d-flex align-items-center gap-3">
                        {!isLoginOrSignupPage && (
                            <>
                                <Link className="nav-link text-white" to="/owner/dashboard">Dashboard</Link>
                                <Link className="nav-link text-white" to="/owner/bookings">Bookings</Link>
                                <Link className="nav-link text-white" to="/owner/profile">Profile</Link>
                                <Link to="/traveler/login" className="btn btn-light text-dark btn-sm">
                                    Become a Traveler
                                </Link>
                                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                        {isLoginOrSignupPage && (
                            <Link to="/" className="btn btn-outline-light btn-sm">
                                Home
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        );
    }

    // Traveler purple header - simplified with just branding, Profile, and Become a Host
    return (
        <header style={{
            background: 'linear-gradient(135deg, #6a11cb 0%, #7f53ac 100%)',
            color: 'white'
        }}>
            <div className="container py-3 d-flex align-items-center justify-content-between">
                <Link to={isLoginOrSignupPage ? "/" : "/traveler/dashboard"} className="text-white text-decoration-none fw-bold fs-5">
                    <i className="bi bi-heart-fill me-2"></i>
                    Airbnb Prototype
                </Link>

                {/* Right side menu - Profile tab and Become a Host */}
                <div className="d-flex align-items-center gap-3">
                    {!isLoginOrSignupPage && (
                        <>
                            <Link to="/traveler/profile" className="text-white text-decoration-none">
                                Profile
                            </Link>
                            <Link to="/owner/login" className="btn btn-light text-dark rounded-pill px-4">
                                Become a host
                            </Link>
                            {user && (
                                <button 
                                    onClick={handleLogout}
                                    className="btn btn-outline-light rounded-pill px-4"
                                >
                                    Logout
                                </button>
                            )}
                        </>
                    )}
                    {isLoginOrSignupPage && (
                        <Link to="/" className="btn btn-outline-light rounded-pill px-4">
                            Home
                        </Link>
                    )}
                    {!isLoginOrSignupPage && (
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
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;