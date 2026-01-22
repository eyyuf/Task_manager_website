import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, LogOut } from 'lucide-react';

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
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.5rem' }}>
                    <div style={{ color: '#3b82f6' }}>
                        <CheckCircle2 size={28} />
                    </div>
                    <span style={{ letterSpacing: '-0.025em' }}>Task<span style={{ color: '#3b82f6' }}>Flow</span></span>
                </Link>

                {token && (
                    <button onClick={handleLogout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
