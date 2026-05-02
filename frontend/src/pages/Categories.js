import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch {
      setError('Failed to load categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    if (!newCategory.trim()) {
      setError('Category name is required');
      return;
    }
    try {
      await API.post('/categories', { name: newCategory.trim() });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch {
      alert('Failed to delete category.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>📁 Categories</h1>

      <div className="card">
        <h2>Add New Category</h2>
        {error && (
          <p style={{ color: '#ef4444', marginBottom: '12px', fontWeight: 500 }}>{error}</p>
        )}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '12px' }}>
          <input
            className="form-group"
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              marginBottom: 0,
            }}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Existing Categories</h2>
        {categories.length === 0 ? (
          <p style={{ color: '#9ca3af' }}>No categories yet. Add one above.</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {categories.map((c) => (
              <li
                key={c._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <span style={{ fontWeight: 500 }}>📁 {c.name}</span>
                <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;
