import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarcodeScanner from '../BarcodeGenerator/BarcodeScanner';
import "./Dashboard.css"
const Dashboard = () => {
  // Sample data
  const sampleProducts = [
    { id: 1, name: 'Gold Necklace', stock: 10, price: 200, category: 'Necklaces' },
    { id: 2, name: 'Diamond Ring', stock: 5, price: 500, category: 'Rings' },
    { id: 3, name: 'Silver Bracelet', stock: 0, price: 100, category: 'Bracelets' },
    { id: 4, name: 'Gold Earrings', stock: 8, price: 150, category: 'Earrings' },
  ];

  const sampleOrders = [
    { id: 1, status: 'Completed', amount: 1000 },
    { id: 2, status: 'Pending', amount: 500 },
    { id: 3, status: 'Shipped', amount: 1200 },
    { id: 4, status: 'Canceled', amount: 300 },
  ];

  const sampleCustomers = [
    { id: 1, name: 'John Doe', purchases: 3 },
    { id: 2, name: 'Jane Smith', purchases: 5 },
    { id: 3, name: 'Robert Brown', purchases: 1 },
    { id: 4, name: 'Emily Clark', purchases: 7 },
  ];

  const [products, setProducts] = useState(sampleProducts);
  const [orders, setOrders] = useState(sampleOrders);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    checkLowStock();
  }, [products]);

  const checkLowStock = () => {
    const alerts = products.filter(product => product.stock <= 5);
    setLowStockAlerts(alerts);

    alerts.forEach(product => {
      toast.warn(`Low Stock: ${product.name} - Only ${product.stock} left!`, {
        position: 'top-right',
      });
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₹{sampleOrders.reduce((acc, order) => acc + order.amount, 0)}</p>
        </div>

        <div className="summary-card" style={{backgroundColor:"red"}}>
          <h3>Pending Orders</h3>
          <p>{orders.filter(order => order.status === 'Pending').length}</p>
        </div>

        <div className="summary-card">
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>

        <div className="summary-card" >
          <h3>Low Stock Alerts</h3>
          <p>{lowStockAlerts.length} items low on stock</p>
        </div>
      </div>

      <div className="low-stock-alerts">
        <h2>Low Stock Items</h2>
        {lowStockAlerts.length > 0 ? (
          <ul>
            {lowStockAlerts.map(product => (
              <li key={product.id}>
                {product.name} - Stock: {product.stock}
              </li>
            ))}
          </ul>
        ) : (
          <p>No low stock alerts</p>
        )}
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>₹{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="customer-data">
        <h2>Customer Data</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Purchases</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.purchases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <BarcodeScanner/> */}
    </div>
  );
};

export default Dashboard;
