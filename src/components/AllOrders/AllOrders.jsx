import React, { useState } from 'react';
import './AllOrders.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import TrackingUpdate from '../TrackingUpdate/TrackingUpdate';

const AllOrders = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterSubcategory, setFilterSubcategory] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
  const [isTrackingUpdate, setIsTrackingUpdate] = useState(false); // State for tracking update view

  const uniqueCategories = Array.from(new Set(orders.map((order) => order.category || 'Unknown')));
  const uniqueSubcategories = Array.from(
    new Set(
      orders
        .filter((order) => filterCategory === 'All' || order.category === filterCategory)
        .map((order) => order.subcategory || 'Unknown')
    )
  );

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === 'All' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesCategory =
      filterCategory === 'All' || order.category === filterCategory;
    const matchesSubcategory =
      filterSubcategory === 'All' || order.subcategory === filterSubcategory;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSubcategory && matchesSearch;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsTrackingUpdate(false); // Ensure TrackingUpdate is not shown when viewing the order
  };

  const handleTrackerUpdate = (order) => {
    setSelectedOrder(order);
    setIsTrackingUpdate(true); // Set tracker update mode
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null); // Reset to show the orders list
    setIsTrackingUpdate(false); // Reset tracking update mode
  };

  return (
    <section className="all-orders">
      {!selectedOrder ? (
        <>
          <div className="all-orders-filters">
            <input
              type="text"
              placeholder="Search by Order ID or Customer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="all-orders-search-input"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="all-orders-status-filter"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="all-orders-category-filter"
            >
              <option value="All">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={filterSubcategory}
              onChange={(e) => setFilterSubcategory(e.target.value)}
              className="all-orders-subcategory-filter"
            >
              <option value="All">All Subcategories</option>
              {uniqueSubcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          <table className="all-orders-table-content">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Total (₹)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.category || 'Unknown'}</td>
                  <td>{order.subcategory || 'Unknown'}</td>
                  <td>{order.total}</td>
                  <td className={`all-orders-status ${order.status.toLowerCase()}`}>{order.status}</td>
                  <td>
                    <button
                      className="all-orders-btn view-btn"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </button>
                    <button
                      className="all-orders-btn tracking-btn"
                      onClick={() => handleTrackerUpdate(order)}
                    >
                      Tracker Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : isTrackingUpdate ? (
        <TrackingUpdate order={selectedOrder} onBack={handleBackToOrders} />
      ) : (
        <OrderDetails order={selectedOrder} onBack={handleBackToOrders} />
      )}
    </section>
  );
};

export default AllOrders;
