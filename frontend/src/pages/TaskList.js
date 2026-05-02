import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: '', status: '', priority: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      const res = await API.get('/tasks', { params });
      setTasks(res.data);
    } catch {
      setError('Failed to load tasks. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert('Failed to delete task.');
    }
  };

  const getStatusBadge = (status) => {
    const map = { Todo: 'badge-todo', 'In Progress': 'badge-inprogress', Done: 'badge-done' };
    return `badge ${map[status] || 'badge-todo'}`;
  };

  const getPriorityBadge = (priority) => {
    const map = { Low: 'badge-low', Medium: 'badge-medium', High: 'badge-high' };
    return `badge ${map[priority] || 'badge-medium'}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>📋 My Tasks</h1>
        <Link to="/add" className="btn btn-primary">
          + Add New Task
        </Link>
      </div>

      <div className="filter-bar">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {(filters.category || filters.status || filters.priority) && (
          <button
            className="btn btn-secondary"
            onClick={() => setFilters({ category: '', status: '', priority: '' })}
          >
            Clear Filters
          </button>
        )}
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Start by adding a new task!</p>
          <Link to="/add" className="btn btn-primary">
            + Add Task
          </Link>
        </div>
      ) : (
        tasks.map((task) => (
          <div className="card" key={task._id}>
            <h2 style={{ marginBottom: '6px' }}>{task.title}</h2>
            {task.description && (
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '6px' }}>
                {task.description}
              </p>
            )}
            <div className="task-meta">
              <span className={getStatusBadge(task.status)}>{task.status}</span>
              <span className={getPriorityBadge(task.priority)}>{task.priority} Priority</span>
              {task.category && <span className="task-category">📁 {task.category}</span>}
              {task.dueDate && (
                <span className="task-due">📅 Due: {formatDate(task.dueDate)}</span>
              )}
            </div>
            <div className="task-actions">
              <Link to={`/edit/${task._id}`} className="btn btn-primary">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
