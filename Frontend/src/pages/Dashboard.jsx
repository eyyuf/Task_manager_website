import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, CheckCircle2, Circle, LayoutGrid, CalendarDays } from 'lucide-react';
import '../styles/Dashboard.css';

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
        <div className="dashboard-wrapper">
            <div className="container dashboard-container">
                <header className="dashboard-header animate-up">
                    <div className="date-badge">
                        <CalendarDays size={20} />
                        <span className="date-text">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <h1 className="dashboard-title">
                        Focused for Today.
                    </h1>
                    <p className="dashboard-subtitle">You have {tasks.filter(t => t.status !== 'done').length} items that need attention.</p>
                </header>

                <div className="card task-create-card animate-up">
                    <form onSubmit={handleCreate}>
                        <input
                            className="task-title-input"
                            placeholder="Title of your next goal..."
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                        <textarea
                            className="task-desc-textarea"
                            placeholder="Details (optional)..."
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            rows="1"
                        />
                        <div className="task-create-actions">
                            <button type="submit" className="btn-black task-create-btn" disabled={submitting}>
                                <Plus size={20} />
                                <span>{submitting ? 'Creating...' : 'Add Task'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="section-header">
                    <LayoutGrid size={20} />
                    <h2 className="section-title">Your Flow</h2>
                </div>

                <div className="tasks-list">
                    {loading ? (
                        <div className="loading-state">Gathering tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state-text">It's quiet in here. Start something new.</p>
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

