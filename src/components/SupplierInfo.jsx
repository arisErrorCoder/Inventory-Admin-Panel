import React, { useState } from 'react';
import "./SupplierInfo.css"
// Define the initial list of supplier names
const initialSupplierNames = [
  "ALL IZ WELL",
  "AVS",
  "BAT",
  "Bliss",
  "charbella",
  "Chess Group Ltd",
  "COTD",
  "DHIMAHI TRADING LIMITED",
  "DT Vape",
  "Kiwi Catering",
  "KPL",
  "Lion Lab",
  "Magical Butter",
  "Mevol",
  "mission",
  "NZTG",
  "Phillip Morris",
  "QSSL",
  "SunTree",
  "Titex Group",
  "Top Trade International Ltd",
  "Vape HQ",
  "Vape Traders New Zealand",
  "Vapeyes",
  "Vapeys Wholesale",
  "Vapo"
];

const SupplierInfo = ({ onSuppliersChange }) => {
  const [suppliers, setSuppliers] = useState([{ name: '', code: '', price: '' }]);
  const [supplierList, setSupplierList] = useState(initialSupplierNames);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSupplierName, setNewSupplierName] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null); // Track the currently open dropdown

  // Filter suppliers based on the search term
  const filteredSuppliers = supplierList.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a new supplier to the list
  const addNewSupplier = () => {
    if (newSupplierName && !supplierList.includes(newSupplierName)) {
      setSupplierList([...supplierList, newSupplierName]);
      setNewSupplierName('');
      setShowAddPopup(false); // Close the popup after adding
    }
  };

  // Handle changes to supplier details (code or price)
  const handleSupplierChange = (index, field, value) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[index][field] = value;
    setSuppliers(updatedSuppliers);
    onSuppliersChange(updatedSuppliers);
  };

  // Add a new supplier row
  const addSupplierRow = () => {
    setSuppliers([...suppliers, { name: '', code: '', price: '' }]);
  };

  // Remove a supplier row
  const deleteSupplierRow = (index) => {
    if (suppliers.length > 1) {
      const updatedSuppliers = suppliers.filter((_, i) => i !== index);
      setSuppliers(updatedSuppliers);
      onSuppliersChange(updatedSuppliers);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="supplier-info">
      <h2>Supplier Information</h2>
      {suppliers.map((supplier, index) => (
        <div className="supplier-row" key={index}>
          <div className="form-group">
            <label>Supplier:</label>
            <div className="supplier-container">
              <div
                className="supplier-summary"
                onClick={() => toggleDropdown(index)}
              >
                <p id="selected-supplier-text">
                  {supplier.name || 'Select Supplier'}
                </p>
                <button>
                  {dropdownIndex === index ? '▲' : '▼'}
                </button>
              </div>

              <div
                id={`supplier-dropdown-${index}`}
                className={`supplier-details ${dropdownIndex === index ? 'show' : ''}`}
              >
                <input
                  type="text"
                  placeholder="Search supplier..."
                  className="search-supplier"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <ul id={`supplier-list-${index}`} className="supplier-list">
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplierName, i) => (
                      <li
                        key={i}
                        className="supplier-item"
                        onClick={() => {
                          const updatedSuppliers = [...suppliers];
                          updatedSuppliers[index].name = supplierName;
                          setSuppliers(updatedSuppliers);
                          onSuppliersChange(updatedSuppliers);
                          setDropdownIndex(null); // Close dropdown after selection
                        }}
                      >
                        {supplierName}
                      </li>
                    ))
                  ) : (
                    <p>No suppliers found</p>
                  )}
                </ul>
                {filteredSuppliers.length === 0 && searchTerm && (
                  <button
                    id="add-new-supplier"
                    className="add-new-supplier"
                    onClick={() => {
                      setShowAddPopup(true);
                    }}
                  >
                    + Add New Supplier
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`supplier-code-${index}`}>Supplier code</label>
            <input
              type="text"
              id={`supplier-code-${index}`}
              className="form-control"
              placeholder="Enter supplier code"
              value={supplier.code}
              onChange={(e) => handleSupplierChange(index, 'code', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`supplier-price-${index}`}>Supplier price</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                id={`supplier-price-${index}`}
                className="form-control"
                value={supplier.price}
                onChange={(e) => handleSupplierChange(index, 'price', e.target.value)}
              />
            </div>
          </div>
          {suppliers.length > 1 && (
            <button
              className="delete-btn"
              onClick={() => deleteSupplierRow(index)}
            >
              &times;
            </button>
          )}
        </div>
      ))}
      <button className="add-supplier-btn" onClick={addSupplierRow}>
        + Add another supplier
      </button>

      {showAddPopup && (
        <div id="add-supplier-popup" className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={() => setShowAddPopup(false)}>
              &times;
            </span>
            <h3>Add New Supplier</h3>
            <input
              type="text"
              id="new-supplier-input"
              placeholder="Enter supplier name"
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
            />
            <button onClick={addNewSupplier}>Add Supplier</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierInfo;
