import React, { useState, useEffect } from 'react';
import './OrderDetails.css';

const OrderDetails = ({ order, onBack }) => {
  const [orderDetails, setOrderDetails] = useState(order);

  // Ensure the state updates when `order` changes
  useEffect(() => {
    if (order) {
      setOrderDetails(order);
    }
  }, [order]);

  // Handle the case when no order is provided
  if (!orderDetails) return <div>Loading...</div>;

  return (
    <section className="order-details">
      <button className="back-button" onClick={onBack}>
        Back to Orders
      </button>
      <h2 className="order-details__heading">Order No: #{orderDetails.id}</h2>
      <p className="order-details__status">
        Status: <span className={`order-details__status--${orderDetails.status.toLowerCase()}`}>
          {orderDetails.status}
        </span>
      </p>
      <p className="order-details__created-at">Order Created at: {orderDetails.createdAt}</p>

      <div className="customer-info">
        <h3 className="section-title">Customer Info</h3>
        <p>Name: {orderDetails.customer}</p>
        <p>Email: {orderDetails.customerEmail}</p>
        <p>Contact No: {orderDetails.contactNumber}</p>
      </div>

      <div className="addresses">
        <h3 className="section-title">Delivery Address</h3>
        <p>Name: {orderDetails.deliveryName}</p>
        <p>Address: {orderDetails.deliveryAddress}</p>
        <p>Contact: {orderDetails.deliveryContact}</p>

        <h3 className="section-title">Billing Address</h3>
        <p>Name: {orderDetails.billingName}</p>
        <p>Address: {orderDetails.billingAddress}</p>
        <p>Contact: {orderDetails.billingContact}</p>
      </div>

      <div className="order-items">
        <h3 className="section-title">Order Items</h3>
        {orderDetails.items && orderDetails.items.length > 0 ? (
          <table className="order-items__table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Sizes</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="order-items__img"
                      src={item.photo}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.subCategory}</td>
                  <td>
                    {item.sizes.map((size, sizeIndex) => (
                      <div key={sizeIndex}>
                        {size.size} x {size.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    ₹
                    {item.sizes
                      .reduce(
                        (acc, size) => acc + size.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items in this order.</p>
        )}
      </div>

      <div className="order-summary">
        <h3 className="section-title">Price Summary</h3>
        <p>Sub Total: ₹{orderDetails.subTotal}</p>
        <p>Shipping: {orderDetails.shipping}</p>
        <p>Total: ₹{orderDetails.total}</p>
      </div>

      <div className="payment-method">
        <h3 className="section-title">Payment Method</h3>
        <p>Method: {orderDetails.paymentMethod}</p>
      </div>
    </section>
  );
};

export default OrderDetails;
