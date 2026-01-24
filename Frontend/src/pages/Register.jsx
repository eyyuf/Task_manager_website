import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, ArrowRight } from 'lucide-react';
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
        <div className="register-container">
            <div className="card register-card animate-up">
                <div className="register-header">
                    <div className="register-icon-wrapper">
                        <UserPlus size={32} />
                    </div>
                    <h1 className="register-title">Create Account</h1>
                    <p className="register-subtitle">Join TaskFlow and start getting things done.</p>
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
                        />
                    </div>

                    <div className="form-group-last">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-black register-btn" disabled={loading}>
                        <span>{loading ? 'Designing account...' : 'Get Started'}</span>
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <p className="register-footer">
                    Already a user? <Link to="/login" className="register-link">Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

