import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import '../styles/Register.css';

const Register = () => {
    const [name, setName] = useState('');
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
            await api.post('/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create your account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-form-side animate-up">
                <div className="register-main-content">
                    <div className="register-header">
                        <div className="register-icon-container">
                            <UserPlus size={40} />
                        </div>
                        <h1 className="register-title">Join the <br />Future.</h1>
                        <p className="register-subtitle">Create your account and start your journey with TaskFlow today.</p>
                    </div>

                    {error && (
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                placeholder="Elon Musk"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="register-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="register-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="register-input"
                            />
                        </div>

                        <button type="submit" className="register-btn" disabled={loading}>
                            <span>{loading ? 'Creating Account...' : 'Get Started Now'}</span>
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <p className="register-footer">
                        Already have an account? <Link to="/login" className="register-link">Sign in here</Link>
                    </p>
                </div>
            </div>

            <div className="register-visual-side hide-mobile">
                <div className="visual-pattern"></div>
                <div className="visual-circle"></div>

                <div className="visual-content">
                    <h2 className="visual-title">Build <br /> Better <br /> Habits.</h2>
                    <p className="visual-desc">
                        Our platform helps you organize your life and focus on what truly matters. Simple, powerful, and built for you.
                    </p>

                    <div className="benefit-list">
                        <div className="benefit-item">
                            <Zap size={20} />
                            <span>Lightning fast task management</span>
                        </div>
                        <div className="benefit-item">
                            <Shield size={20} />
                            <span>Secure & private by design</span>
                        </div>
                        <div className="benefit-item">
                            <Rocket size={20} />
                            <span>Scale your productivity</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;


