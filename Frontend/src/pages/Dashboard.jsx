import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Plus, Trash2, CheckCircle2, Circle, LayoutGrid, Sparkles, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const textareaRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.email ? user.email.split('@')[0] : 'Innovator';

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

    const handleTextareaChange = (e) => {
        setNewTask({ ...newTask, description: e.target.value });
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
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

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const activeTasks = tasks.filter(t => t.status !== 'done').length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    return (
        <div className="dashboard-wrapper">
            <div className="container dashboard-container">
                <header className="dashboard-header animate-up">
                    <div className="welcome-section">
                        <span className="welcome-greeting">{getGreeting()}, {userName}</span>
                        <h1 className="dashboard-title">Ready to take <br /> charge of today?</h1>
                        <p className="dashboard-subtitle">
                            {tasks.length > 0
                                ? `You have ${activeTasks} tasks active. Focus on one at a time and you'll be done in no time.`
                                : "The day is yours to define. What will you achieve today?"}
                        </p>
                    </div>

                    <div className="stats-board">
                        <div className="stat-card">
                            <span className="stat-value">{activeTasks}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={14} color="#64748b" />
                                <span className="stat-label">Remaining</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">{completionRate}%</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <TrendingUp size={14} color="#3b82f6" />
                                <span className="stat-label">Progress</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">{completedTasks}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={14} color="#10b981" />
                                <span className="stat-label">Done</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="card task-create-card animate-up">
                    <form onSubmit={handleCreate}>
                        <input
                            className="task-title-input"
                            placeholder="What's on your mind?"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                        <textarea
                            ref={textareaRef}
                            className="task-desc-textarea"
                            placeholder="Add details, links, or sub-tasks..."
                            value={newTask.description}
                            onChange={handleTextareaChange}
                            rows="1"
                        />
                        <div className="task-create-footer">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: 'auto', color: '#64748b' }}>
                                <Sparkles size={16} />
                                <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Idea</span>
                            </div>
                            <button type="submit" className="btn-black task-create-btn" disabled={submitting || !newTask.title.trim()}>
                                <Plus size={18} />
                                <span>{submitting ? 'Adding...' : 'Add to List'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="section-header">
                    <LayoutGrid size={20} color="#0f172a" />
                    <h2 className="section-title">Your Daily Flow</h2>
                </div>

                <div className="tasks-list">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>
                            <div className="animate-pulse" style={{ color: '#64748b', fontWeight: '600' }}>Preparing your day...</div>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="empty-state animate-up">
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🍃</div>
                            <p className="empty-state-text">No tasks yet. Take a breath and plan your next big win.</p>
                        </div>
                    ) : (
                        tasks.map(task => {
                            const isDone = task.status === 'done';
                            return (
                                <div key={task._id} className={`card task-card animate-up ${isDone ? 'done' : 'todo'}`}>
                                    <button
                                        onClick={() => handleToggle(task._id, task.status)}
                                        className={`task-toggle-btn ${isDone ? 'done' : 'todo'}`}
                                    >
                                        {isDone ? <CheckCircle2 size={26} /> : <Circle size={26} />}
                                    </button>
                                    <div className="task-content">
                                        <h3 className={`task-title ${isDone ? 'done' : 'todo'}`}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className="task-description">{task.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="task-delete-btn"
                                        title="Delete Task"
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



