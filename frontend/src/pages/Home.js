import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container text-center">
                <h1 className="display-3 fw-bold mb-4">Welcome to Airbnb</h1>
                <p className="lead mb-5">Find your perfect stay or host your property</p>
                
                <div className="row justify-content-center">
                    <div className="col-md-5 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body p-5">
                                <h2 className="h3 mb-3">I'm a Traveler</h2>
                                <p className="text-muted mb-4">Search and book amazing places to stay</p>
                                <Link to="/traveler/login" className="btn btn-primary btn-lg w-100 mb-2">
                                    Login
                                </Link>
                                <Link to="/traveler/signup" className="btn btn-outline-primary btn-lg w-100">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-5 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body p-5">
                                <h2 className="h3 mb-3">I'm a Property Owner</h2>
                                <p className="text-muted mb-4">List your property and earn money</p>
                                <Link to="/owner/login" className="btn btn-success btn-lg w-100 mb-2">
                                    Login
                                </Link>
                                <Link to="/owner/signup" className="btn btn-outline-success btn-lg w-100">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;