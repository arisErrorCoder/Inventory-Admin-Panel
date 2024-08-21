import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Overview</h1>
      </header>
      <main className="dashboard-content">
        <div className="data-card">
          <h2>Total Sales</h2>
          <p>$25,000</p>
        </div>
        <div className="data-card">
          <h2>New Users</h2>
          <p>1,200</p>
        </div>
        <div className="data-card">
          <h2>Orders</h2>
          <p>3,400</p>
        </div>
        <div className="data-card">
          <h2>Active Subscriptions</h2>
          <p>980</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
