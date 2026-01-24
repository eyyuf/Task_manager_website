import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Components.css';

const Footer = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) return null;

    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-brand">TaskFlow</p>
                <p>&copy; {new Date().getFullYear()} Minimalistic Task Management. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#" className="footer-link">Instagram</a>
                    <a href="#" className="footer-link">Twitter</a>
                    <a href="#" className="footer-link">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


