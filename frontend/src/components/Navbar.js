import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📋 ITPM Task Manager</Link>
        <span className="navbar-subtitle">IT23223080 - Uthpala G D</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/add" className={location.pathname === '/add' ? 'active' : ''}>
            + Add Task
          </Link>
        </li>
        <li>
          <Link
            to="/categories"
            className={location.pathname === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
