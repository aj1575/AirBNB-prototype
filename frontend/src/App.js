import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Traveler pages (you'll create these)
import TravelerSignup from './pages/traveler/Signup';
import TravelerLogin from './pages/traveler/Login';
import TravelerDashboard from './pages/traveler/Dashboard';
import TravelerProfile from './pages/traveler/Profile';

// Landing page
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          
          {/* Traveler Routes */}
          <Route path="/traveler/signup" element={<TravelerSignup />} />
          <Route path="/traveler/login" element={<TravelerLogin />} />
          <Route path="/traveler/dashboard" element={<TravelerDashboard />} />
          <Route path="/traveler/profile" element={<TravelerProfile />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;