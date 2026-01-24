import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowRight, Lock, Mail, Star } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ email }));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Unauthorized access denied.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-side animate-up">
                <div className="login-logo-container">
                    <div className="login-logo">
                        <div className="login-logo-box"></div>
                        <span>TaskFlow</span>
                    </div>
                </div>

                <div className="login-main-content">
                    <h1 className="login-title">Welcome back.</h1>
                    <p className="login-subtitle">Login to your account to continue.</p>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="login-input"
                                />
                            </div>
                        </div>

                        <div className="form-group-last">
                            <div className="login-form-header">
                                <label className="form-label">Password</label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="login-input"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-black login-btn" disabled={loading}>
                            <span>{loading ? 'Verifying...' : 'Sign In'}</span>
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <p className="login-footer-text">
                        Don't have an account? <Link to="/register" className="login-signup-link">Create one for free</Link>
                    </p>
                </div>

                <div className="login-copyright-container">
                    <p className="login-copyright">&copy; 2026 TaskFlow. All rights reserved.</p>
                </div>
            </div>

            <div className="login-visual-side hide-mobile">
                <div className="visual-circle-1"></div>
                <div className="visual-circle-2"></div>

                <div className="visual-content">
                    <div className="visual-accent"></div>
                    <h2 className="visual-headline">
                        Manage the <br /> <span className="visual-accent-text">Impossible.</span>
                    </h2>
                    <p className="visual-description">
                        Experience the next generation of productivity. Distraction-free, powerful, and truly minimalistic.
                    </p>

                    <div className="rating-container">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#3b82f6" color="#3b82f6" />)}
                        <span className="rating-text">5.0 Rating</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

