import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowRight, Lock, Mail, Star } from 'lucide-react';

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
        <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#ffffff' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '3rem' }} className="animate-up">
                <div style={{ marginBottom: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.25rem', color: '#000' }}>
                        <div style={{ width: '32px', height: '32px', border: '3px solid #000', borderRadius: '8px' }}></div>
                        <span>TaskFlow</span>
                    </div>
                </div>

                <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Welcome back.</h1>
                    <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '2.5rem' }}>Login to your account to continue.</p>

                    {error && (
                        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '0.875rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Password</label>
                                <a href="#" style={{ fontSize: '0.875rem', color: '#3b82f6', fontWeight: '500' }}>Forgot password?</a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ paddingLeft: '3rem' }}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-black" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
                            <span>{loading ? 'Verifying...' : 'Sign In'}</span>
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <p style={{ marginTop: '2.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: '#000', fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Create one for free</Link>
                    </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>&copy; 2026 TaskFlow. All rights reserved.</p>
                </div>
            </div>

            <div style={{ flex: 1.2, backgroundColor: '#000', padding: '4rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }} className="hide-mobile">
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>

                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '64px', height: '4px', backgroundColor: '#3b82f6', marginBottom: '2.5rem' }}></div>
                    <h2 style={{ fontSize: '3.75rem', color: '#fff', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
                        Manage the <br /> <span style={{ color: '#3b82f6' }}>Impossible.</span>
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '1.25rem', maxWidth: '480px', lineHeight: 1.6, marginBottom: '3rem' }}>
                        Experience the next generation of productivity. Distraction-free, powerful, and truly minimalistic.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#3b82f6" color="#3b82f6" />)}
                        <span style={{ color: '#fff', fontWeight: '600', marginLeft: '0.5rem' }}>5.0 Rating</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
