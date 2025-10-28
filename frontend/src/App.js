import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Shared Components
import Navbar from './components/shared/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Traveler Pages
import TravelerSignup from './pages/traveler/Signup';
import TravelerLogin from './pages/traveler/Login';
import TravelerDashboard from './pages/traveler/Dashboard';
import TravelerProfile from './pages/traveler/Profile';
import PropertySearch from './pages/traveler/PropertySearch';
import PropertyDetails from './pages/traveler/PropertyDetails';
import MyBookings from './pages/traveler/MyBookings';
import Favorites from './pages/traveler/Favorites';

// Owner Pages
import OwnerSignup from './pages/owner/Signup';
import OwnerLogin from './pages/owner/Login';
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerProfile from './pages/owner/Profile';
import AddEditProperty from './pages/owner/AddProperty';
import BookingManagement from './pages/owner/BookingManagement';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Traveler Routes */}
                <Route path="/traveler/signup" element={<TravelerSignup />} />
                <Route path="/traveler/login" element={<TravelerLogin />} />
                <Route path="/traveler/dashboard" element={<ProtectedRoute requiredRole="traveler"><TravelerDashboard /></ProtectedRoute>} />
                <Route path="/traveler/profile" element={<ProtectedRoute requiredRole="traveler"><TravelerProfile /></ProtectedRoute>} />
                <Route path="/traveler/search" element={<ProtectedRoute requiredRole="traveler"><PropertySearch /></ProtectedRoute>} />
                <Route path="/traveler/property/:id" element={<ProtectedRoute requiredRole="traveler"><PropertyDetails /></ProtectedRoute>} />
                <Route path="/traveler/bookings" element={<ProtectedRoute requiredRole="traveler"><MyBookings /></ProtectedRoute>} />
                <Route path="/traveler/favorites" element={<ProtectedRoute requiredRole="traveler"><Favorites /></ProtectedRoute>} />

                {/* Owner Routes */}
                <Route path="/owner/signup" element={<OwnerSignup />} />
                <Route path="/owner/login" element={<OwnerLogin />} />
                <Route path="/owner/dashboard" element={<ProtectedRoute requiredRole="owner"><OwnerDashboard /></ProtectedRoute>} />
                <Route path="/owner/profile" element={<ProtectedRoute requiredRole="owner"><OwnerProfile /></ProtectedRoute>} />
                <Route path="/owner/properties/new" element={<ProtectedRoute requiredRole="owner"><AddEditProperty /></ProtectedRoute>} />
                <Route path="/owner/properties/edit/:id" element={<ProtectedRoute requiredRole="owner"><AddEditProperty /></ProtectedRoute>} />
                <Route path="/owner/bookings" element={<ProtectedRoute requiredRole="owner"><BookingManagement /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

function HomePage() {
    return (
        <div>
            <div className="bg-light py-5">
                <div className="container text-center py-5">
                    <h1 className="display-4 fw-bold mb-4">Find Your Perfect Stay</h1>
                    <p className="lead mb-4">Book unique homes and experiences all over the world</p>
                    
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/traveler/signup" className="btn btn-primary btn-lg px-5">
                            Sign Up as Traveler
                        </Link>
                        <Link to="/owner/signup" className="btn btn-outline-primary btn-lg px-5">
                            Become a Host
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="display-4 mb-3"><i className="bi bi-house-door"></i></div>
                            <h4>Unique Properties</h4>
                            <p className="text-muted">Find the perfect place for your next adventure</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="display-4 mb-3"><i className="bi bi-star-fill"></i></div>
                            <h4>Easy Booking</h4>
                            <p className="text-muted">Book your stay in just a few clicks</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="display-4 mb-3"><i className="bi bi-robot"></i></div>
                            <h4>AI Travel Assistant</h4>
                            <p className="text-muted">Get personalized itineraries for your trip</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;