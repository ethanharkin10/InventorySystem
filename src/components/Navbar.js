import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

function Navbar() {
  return (
    <nav className = "navbar">
      <ul className= "navbar-list">
        <li className = "navbar-item">
          <Link to="/">Dashboard</Link>
        </li>
        <li className = "navbar-item">
          <Link to="/inventory">Inventory</Link>
        </li>
        <li className = "navbar-item">
          <Link to="/orders">Orders</Link>
        </li>
        <li className = "navbar-item">
          <Link to="/recenttransactions">Recent Transactions</Link>
        </li>
        <li className = "navbar-item">
          <Link to="/players">Players</Link>
        </li>
        <li className = "navbar-item">
          <Link to="/staff">Staff</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;