import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Owner Pages
import OwnerSignup from './pages/owner/Signup';
import OwnerLogin from './pages/owner/Login';
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerProfile from './pages/owner/Profile';
import AddEditProperty from './pages/owner/AddProperty';
import BookingRequests from './pages/owner/BookingRequests';

// Shared Components
import Navbar from './components/shared/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Home */}
                <Route path="/" element={<Navigate to="/owner/login" />} />

                {/* Owner Routes */}
                <Route path="/owner/signup" element={<OwnerSignup />} />
                <Route path="/owner/login" element={<OwnerLogin />} />
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/owner/profile" element={<OwnerProfile />} />
                <Route path="/owner/properties/new" element={<AddEditProperty />} />
                <Route path="/owner/properties/edit/:id" element={<AddEditProperty />} />
                <Route path="/owner/bookings" element={<BookingRequests />} />

                {/* Traveler Routes - Yuktaa will add these */}
                {/* <Route path="/traveler/login" element={<TravelerLogin />} /> */}
            </Routes>
        </Router>
    );
}

export default App;