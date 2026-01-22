import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Plus, Trash2, CheckCircle, Circle, LogOut, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [addingTask, setAddingTask] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            console.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;
        setAddingTask(true);
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([response.data, ...tasks]);
            setNewTask({ title: '', description: '' });
        } catch (err) {
            console.error('Failed to create task');
        } finally {
            setAddingTask(false);
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const response = await api.put(`/tasks/${id}`, updates);
            setTasks(tasks.map(t => t._id === id ? response.data : t));
        } catch (err) {
            console.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error('Failed to delete task');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '600' }}>Tasks</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Management your daily flow</p>
                    </div>
                    <button onClick={logout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.875rem' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </header>

                <form onSubmit={handleCreateTask} className="card animate-fade-in" style={{ marginBottom: '2.5rem', borderStyle: 'dashed' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <input
                            style={{ border: 'none', fontSize: '1.1rem', fontWeight: '500', padding: '0.5rem 0' }}
                            placeholder="What needs to be done?"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                        <textarea
                            style={{ border: 'none', resize: 'none', fontSize: '0.9rem', color: 'var(--text-secondary)', padding: '0' }}
                            placeholder="Add description (optional)..."
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            rows="2"
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={addingTask}>
                                <Plus size={18} /> {addingTask ? 'Adding...' : 'Add Task'}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="task-list">
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                            <p>No tasks yet. Start by adding one above.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {tasks.map((task) => (
                                <div key={task._id} className="card animate-fade-in" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'all 0.2s ease' }}>
                                    <button
                                        onClick={() => handleUpdateTask(task._id, { completed: !task.completed })}
                                        style={{ marginTop: '0.25rem', color: task.completed ? 'var(--success-color)' : 'var(--text-secondary)' }}
                                    >
                                        {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                                    </button>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '500', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                                {task.description}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        style={{ color: '#ff4d4d', opacity: 0.6, transition: 'opacity 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
