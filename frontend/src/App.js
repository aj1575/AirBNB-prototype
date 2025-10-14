import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import PropertyDetails from './pages/traveler/PropertyDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

// Shared Components
import Navbar from './components/shared/Navbar';

// Traveler Pages
import TravelerSignup from './pages/traveler/Signup';
import TravelerLogin from './pages/traveler/Login';
import TravelerDashboard from './pages/traveler/Dashboard';
import TravelerProfile from './pages/traveler/Profile';
import PropertySearch from './pages/traveler/PropertySearch';

// Owner Pages
import OwnerSignup from './pages/owner/Signup';
import OwnerLogin from './pages/owner/Login';
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerProfile from './pages/owner/Profile';
import AddEditProperty from './pages/owner/AddProperty';
import BookingRequests from './pages/owner/BookingRequests';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* Traveler Routes */}
                <Route path="/traveler/signup" element={<TravelerSignup />} />
                <Route path="/traveler/login" element={<TravelerLogin />} />
                <Route path="/traveler/dashboard" element={<TravelerDashboard />} />
                <Route path="/traveler/profile" element={<TravelerProfile />} />
                <Route path="/traveler/search" element={<PropertySearch />} />
                <Route path="/traveler/property/:id" element={<PropertyDetails />} />

                {/* Owner Routes */}
                <Route path="/owner/signup" element={<OwnerSignup />} />
                <Route path="/owner/login" element={<OwnerLogin />} />
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/owner/profile" element={<OwnerProfile />} />
                <Route path="/owner/properties/new" element={<AddEditProperty />} />
                <Route path="/owner/properties/edit/:id" element={<AddEditProperty />} />
                <Route path="/owner/bookings" element={<BookingRequests />} />
            </Routes>
        </BrowserRouter>
    );
}

function HomePage() {
    return (
        <div>
            {/* Hero Section */}
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

            {/* Features Section */}
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="display-4 mb-3">🏠</div>
                            <h4>Unique Properties</h4>
                            <p className="text-muted">Find the perfect place for your next adventure</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="display-4 mb-3">⭐</div>
                            <h4>Easy Booking</h4>
                            <p className="text-muted">Book your stay in just a few clicks</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="display-4 mb-3">🤖</div>
                            <h4>AI Travel Assistant</h4>
                            <p className="text-muted">Get personalized itineraries for your trip</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container text-center">
                    <p className="mb-0">© 2024 Airbnb Clone - CMPE 273 Lab Project</p>
                    <p className="small text-muted">Built with React, Node.js, Express & MySQL</p>
                </div>
            </footer>
        </div>
    );
}

export default App;