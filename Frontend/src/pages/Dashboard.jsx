import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, CheckCircle2, Circle, LayoutGrid, CalendarDays } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            console.error('Fetch failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;
        setSubmitting(true);
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([response.data, ...tasks]);
            setNewTask({ title: '', description: '' });
        } catch (err) {
            console.error('Create failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const nextStatus = currentStatus === 'done' ? 'todo' : 'done';
            const response = await api.put(`/tasks/${id}`, { status: nextStatus });
            setTasks(tasks.map(t => t._id === id ? response.data : t));
        } catch (err) {
            console.error('Toggle failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error('Delete failed');
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: 'calc(100vh - 72px - 140px)', padding: '4rem 1.5rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <header style={{ marginBottom: '4rem' }} className="animate-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', marginBottom: '1rem' }}>
                        <CalendarDays size={20} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                        Focused for Today.
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '1.25rem' }}>You have {tasks.filter(t => t.status !== 'done').length} items that need attention.</p>
                </header>

                <div className="card animate-up" style={{ marginBottom: '3rem', border: '2px dashed #e5e7eb', boxShadow: 'none' }}>
                    <form onSubmit={handleCreate}>
                        <input
                            style={{ border: 'none', padding: 0, fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}
                            placeholder="Title of your next goal..."
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                        <textarea
                            style={{ border: 'none', padding: 0, fontSize: '1.125rem', color: '#6b7280', resize: 'none', marginBottom: '1.5rem' }}
                            placeholder="Details (optional)..."
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            rows="1"
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn-black" disabled={submitting} style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }}>
                                <Plus size={20} />
                                <span>{submitting ? 'Creating...' : 'Add Task'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <LayoutGrid size={20} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Your Flow</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Gathering tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: '#f9fafb', borderRadius: '16px' }}>
                            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>It's quiet in here. Start something new.</p>
                        </div>
                    ) : (
                        tasks.map(task => {
                            const isDone = task.status === 'done';
                            return (
                                <div key={task._id} className="card animate-up" style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '1.25rem', padding: '1.5rem',
                                    border: isDone ? '1px solid #f3f4f6' : '1px solid #e5e7eb',
                                    opacity: isDone ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}>
                                    <button
                                        onClick={() => handleToggle(task._id, task.status)}
                                        style={{ marginTop: '0.25rem', color: isDone ? '#3b82f6' : '#d1d5db' }}
                                    >
                                        {isDone ? <CheckCircle2 size={26} /> : <Circle size={26} />}
                                    </button>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '1.125rem', fontWeight: '700',
                                            textDecoration: isDone ? 'line-through' : 'none',
                                            color: isDone ? '#6b7280' : '#000000',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{task.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        style={{ padding: '0.5rem', color: '#f87171', borderRadius: '8px' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
