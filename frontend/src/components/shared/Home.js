import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 align-items-center">
                <div className="col-12 text-center">
                    <h1 className="display-3 mb-4">🏠 Welcome to Airbnb Prototype</h1>
                    <p className="lead mb-5">CMPE 273 - Lab 1 Project</p>
                    
                    <div className="row justify-content-center">
                        {/* Traveler Section */}
                        <div className="col-md-5 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body d-flex flex-column justify-content-center p-5">
                                    <div className="mb-4">
                                        <i className="bi bi-suitcase-lg" style={{ fontSize: '4rem', color: '#0d6efd' }}></i>
                                    </div>
                                    <h2 className="card-title mb-3">I'm a Traveler</h2>
                                    <p className="card-text text-muted mb-4">
                                        Find and book amazing places to stay
                                    </p>
                                    <div className="d-grid gap-2">
                                        <Link to="/traveler/login" className="btn btn-primary btn-lg">
                                            Traveler Login
                                        </Link>
                                        <Link to="/traveler/signup" className="btn btn-outline-primary">
                                            Sign Up as Traveler
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Owner Section */}
                        <div className="col-md-5 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body d-flex flex-column justify-content-center p-5">
                                    <div className="mb-4">
                                        <i className="bi bi-house-door" style={{ fontSize: '4rem', color: '#198754' }}></i>
                                    </div>
                                    <h2 className="card-title mb-3">I'm an Owner</h2>
                                    <p className="card-text text-muted mb-4">
                                        List your property and manage bookings
                                    </p>
                                    <div className="d-grid gap-2">
                                        <Link to="/owner/login" className="btn btn-success btn-lg">
                                            Owner Login
                                        </Link>
                                        <Link to="/owner/signup" className="btn btn-outline-success">
                                            Sign Up as Owner
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-5 text-muted">
                        <p>Team: Yuktaa (Traveler Side) & Anurag (Owner Side)</p>
                        <p>Course: CMPE 273 | Due: October 20, 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;