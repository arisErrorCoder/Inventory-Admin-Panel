import React, { useState } from 'react';
import './TrackingUpdate.css';

const TrackingUpdate = ({ order,onBack }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [trackingImage, setTrackingImage] = useState(null);
  const [status, setStatus] = useState(order.status);

  const handleTrackingNumberChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleTrackingLinkChange = (e) => {
    setTrackingLink(e.target.value);
  };

  const handleImageChange = (e) => {
    setTrackingImage(e.target.files[0]);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update order with new details (tracking and status)
    console.log("Tracking Number:", trackingNumber);
    console.log("Tracking Link:", trackingLink);
    console.log("Tracking Image:", trackingImage);
    console.log("Updated Status:", status);
  };

  return (
    <div className="tracking-update-container">
            <button className="back-button" onClick={onBack}>
        Back to Orders
      </button>
      <h2 className="tracking-update-title">Tracking Update - {order.id}</h2>

      <div className="order-info">
        <p><strong>Customer:</strong> {order.customer}</p>
        {/* <p><strong>Product:</strong> {order.product}</p> */}
        {/* <p><strong>Quantity:</strong> {order.quantity}</p> */}
        <p><strong>Total:</strong> ₹{order.total}</p>
        <p><strong>Status:</strong> <span className={`status ${status.toLowerCase()}`}>{status}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="tracking-update-form">
        <div className="form-group">
          <label className="form-label">Tracking Number:</label>
          <input
            className="form-input"
            type="text"
            value={trackingNumber}
            onChange={handleTrackingNumberChange}
            placeholder="Enter tracking number"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tracking Link:</label>
          <input
            className="form-input"
            type="url"
            value={trackingLink}
            onChange={handleTrackingLinkChange}
            placeholder="Enter tracking link"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Upload Tracking Image:</label>
          <input
            className="form-input-file"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {trackingImage && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(trackingImage)}
                alt="Tracking Preview"
                className="preview-image"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Update Status:</label>
          <select
            className="form-input"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        <button type="submit" className="btn-update-tracking">Update Tracking</button>
      </form>
    </div>
  );
};

export default TrackingUpdate;
