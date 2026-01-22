import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p style={{ fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>TaskFlow</p>
                <p>&copy; {new Date().getFullYear()} Minimalistic Task Management. All rights reserved.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
                    <a href="#" style={{ color: '#9ca3af', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#3b82f6'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Instagram</a>
                    <a href="#" style={{ color: '#9ca3af', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#3b82f6'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Twitter</a>
                    <a href="#" style={{ color: '#9ca3af', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#3b82f6'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
