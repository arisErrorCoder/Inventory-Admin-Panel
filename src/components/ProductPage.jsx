import React, { useState } from 'react';
import './ProductPage.css';
import AddProductPage from './AddProductPage'; // Adjust the import based on your file structure

const ProductPage = () => {
  const [showAddProductPage, setShowAddProductPage] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState({});
  const [inventoryVisible, setInventoryVisible] = useState({});
  const [pricingVisible, setPricingVisible] = useState({});

  const toggleDetails = (index) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleInventory = (index) => {
    setInventoryVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const togglePricing = (index) => {
    setPricingVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const products = [
    {
      name: 'Sample Product',
      brand: 'Sample Brand',
      supplier: 'Sample Supplier',
      inventory: 100,
      price: 99.99,
      channels: 'Online Store',
      created: '2024-08-19',
      imageUrl: 'https://via.placeholder.com/50',
      inventoryDetails: [
        { sku: '12687 Tobacco Smoky Brown / YELLOW', upc: '6904060126875' },
        { sku: '12687 Tobacco Smoky Brown / GREEN', upc: '6904060126868' },
      ],
      pricingDetails: [
        { price: '$99.99', discount: '10%', effectiveDate: '2024-08-01' },
        { price: '$89.99', discount: '15%', effectiveDate: '2024-08-15' },
      ],
    },
    // Add more products as needed
  ];

  // Handle button click to show the AddProductPage
  const handleAddProductClick = () => {
    setShowAddProductPage(true);
  };

  // Handle returning to the product list (optional)
  const handleBackToProducts = () => {
    setShowAddProductPage(false);
  };

  return (
    <div className="containerr">
      {showAddProductPage ? (
        <AddProductPage onBack={handleBackToProducts} /> // Pass back function if needed
      ) : (
        <>
          <h1>Products</h1>
          <div className="subtitle">Add, view and edit your products in one place. Need help?</div>

          <div className="header">
            <div className="info"></div>
            <button onClick={handleAddProductClick}>Add Products</button>
          </div>

          <div className="row">
        <input type="text" placeholder="Search for products" />
        <select>
          <option value="">Product category</option>
        </select>
        <input type="text" placeholder="Tags" />
      </div>

      <div className="row">
        <select>
          <option value="">Supplier</option>
        </select>
        <input type="text" placeholder="Brand" />
        <input type="text" placeholder="Channel status" />
      </div>

      <div className="row clear-filters">
        <input type="text" placeholder="Purchase order number" className="full-width" />
        <a href="#">Clear filters</a>
      </div>

      <div className="search-button">
        <button>Search</button>
      </div>

          <table>
            <thead>
              <tr>
                <th></th>
                <th><input type="checkbox" /></th>
                <th>Product</th>
                <th>Brand</th>
                <th>Supplier</th>
                <th>Inventory</th>
                <th>Retail price</th>
                <th>Channels</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <span
                        className="dropdown-arrow"
                        onClick={() => toggleDetails(index)}
                      >
                        {detailsVisible[index] ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-up"></i>}
                      </span>
                    </td>
                    <td><input type="checkbox" /></td>
                    <td>
                      <img src={product.imageUrl} alt="Product" />
                      {product.name}
                    </td>
                    <td>{product.brand}</td>
                    <td>{product.supplier}</td>
                    <td>{product.inventory}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.channels}</td>
                    <td>{product.created}</td>
                    <td>
                      <div className="icon-group">
                        <i className="fa-solid fa-pencil edit-icon"></i>
                        <i className="fa-solid fa-trash delete-icon"></i>
                      </div>
                    </td>
                  </tr>
                  {detailsVisible[index] && (
                    <tr className="details-row">
                      <td colSpan="10">
                        <div className="details-content">
                          <div className="section-container">
                            <div className="section">
                              <h3 onClick={() => toggleInventory(index)}>
                                Inventory {inventoryVisible[index] ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-up"></i>}
                              </h3>
                              {inventoryVisible[index] && (
                                <table className="details-table">
                                  <thead>
                                    <tr>
                                      <th>SKU</th>
                                      <th>UPC</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {product.inventoryDetails.map((detail, i) => (
                                      <tr key={i}>
                                        <td>{detail.sku}</td>
                                        <td>{detail.upc}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                            <div className="section">
                              <h3 onClick={() => togglePricing(index)}>
                                Pricing {pricingVisible[index] ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-up"></i>}
                              </h3>
                              {pricingVisible[index] && (
                                <table className="details-table">
                                  <thead>
                                    <tr>
                                      <th>Price</th>
                                      <th>Discount</th>
                                      <th>Effective Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {product.pricingDetails.map((detail, i) => (
                                      <tr key={i}>
                                        <td>{detail.price}</td>
                                        <td>{detail.discount}</td>
                                        <td>{detail.effectiveDate}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                          <div className="icon-group">
                            <i className="fa-solid fa-pencil"></i>
                            <i className="fa-solid fa-trash delete-icon"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductPage;
