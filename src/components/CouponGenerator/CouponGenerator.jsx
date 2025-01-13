import React, { useState } from 'react';
import './CouponGenerator.css';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

const CouponGenerator = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [amount, setAmount] = useState(''); // New state for amount
  const [coupons, setCoupons] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the amount is valid
    if (parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const newCoupon = {
      couponCode,
      discountType,
      discountValue,
      expiryDate,
      amount, // Include amount in the coupon
    };

    setCoupons([...coupons, newCoupon]);

    // Reset form fields after submission
    setCouponCode('');
    setDiscountValue('');
    setExpiryDate('');
    setAmount(''); // Reset amount field
  };

  const handleDelete = (couponCode) => {
    const updatedCoupons = coupons.filter(coupon => coupon.couponCode !== couponCode);
    setCoupons(updatedCoupons);
  };

  const handleEdit = (coupon) => {
    setCouponCode(coupon.couponCode);
    setDiscountType(coupon.discountType);
    setDiscountValue(coupon.discountValue);
    setExpiryDate(coupon.expiryDate);
    setAmount(coupon.amount); // Set amount for editing
    handleDelete(coupon.couponCode);  // Remove coupon before editing
  };

  return (
    <div className="coupon-generator-container">
      <h2 className="coupon-generator-title">Coupon Generator</h2>
      <form className="coupon-form" onSubmit={handleSubmit}>
        <div className="coupon-form-group">
          <label htmlFor="couponCode" className="coupon-form-label">Coupon Code</label>
          <input
            type="text"
            id="couponCode"
            className="coupon-form-input"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
        </div>
        
        <div className="coupon-form-group">
          <label htmlFor="discountType" className="coupon-form-label">Discount Type</label>
          <select
            id="discountType"
            className="coupon-form-select"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            required
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
        
        <div className="coupon-form-group">
          <label htmlFor="discountValue" className="coupon-form-label">Discount Value</label>
          <input
            type="number"
            id="discountValue"
            className="coupon-form-input"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="coupon-form-group">
          <label htmlFor="expiryDate" className="coupon-form-label">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            className="coupon-form-input"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div className="coupon-form-group">
          <label htmlFor="amount" className="coupon-form-label">Amount (Minimum Order Amount)</label>
          <input
            type="number"
            id="amount"
            className="coupon-form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>
        
        <button type="submit" className="coupon-form-btn">Generate Coupon</button>
      </form>

      {/* Coupons Table */}
      {coupons.length > 0 && (
        <div className="coupon-table-container">
          <h3 className="coupon-table-title">Generated Coupons</h3>
          <table className="coupon-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Type</th>
                <th>Discount Value</th>
                <th>Expiry Date</th>
                <th>Minimum Order Amount</th> {/* Display the Amount */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index}>
                  <td>{coupon.couponCode}</td>
                  <td>{coupon.discountType}</td>
                  <td>{coupon.discountValue}</td>
                  <td>{coupon.expiryDate}</td>
                  <td>{coupon.amount}</td> {/* Show the Amount */}
                  <td>
                    <button
                      className="coupon-table-btn edit-btn"
                      onClick={() => handleEdit(coupon)}
                    >
                      Edit
                    </button>
                    <button
                      className="coupon-table-btn delete-btn"
                      onClick={() => handleDelete(coupon.couponCode)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default CouponGenerator;
