import './App.css';
import './Navbar.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import bannerImage from './resources/banner.jpg';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import RecentTransactions from './components/RecentTransactions';
import Players from './components/Players';
import Staff from './components/Staff';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <img 
          src={bannerImage} 
          alt="Banner" 
          style={{ width: '100%', height: '200px' }} 
        />
        <h1>Inventory Management System</h1>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/recenttransactions" element={<RecentTransactions />} />
            <Route path="/players" element={<Players />} />
            <Route path="/staff" element={<Staff />} />
          </Routes>
        </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
