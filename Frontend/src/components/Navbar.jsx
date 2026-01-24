import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, LogOut } from 'lucide-react';
import '../styles/Components.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) return null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-icon">
                        <CheckCircle2 size={28} />
                    </div>
                    <span>Task<span className="brand-text-accent">Flow</span></span>
                </Link>

                {token && (
                    <button onClick={handleLogout} className="btn-outline navbar-logout-btn">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

