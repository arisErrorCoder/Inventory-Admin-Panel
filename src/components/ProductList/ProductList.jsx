import React, { useState } from "react";
import { useStore } from "../Context/Store";
import "./ProductList.css";

const ProductList = () => {
  const { products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle product click (open the modal)
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Enhanced function to convert product data to CSV format
  const convertToCSV = (data) => {
    const header = [
      "ID",
      "Product Name",
      "Description",
      "Polish",
      "Category",
      "Subcategory",
      "Barcode",
      "Cost Price (₹)",
      "Size",
      "Retail Price (₹)",
      "Wholesale Price (₹)",
      "Stock",
      "Threshold Stock",
      "Product Images",
    ];

    const rows = data.flatMap((product, index) => {
      return product.sizes.map((size) => {
        return [
          `"${index + 1}"`, // Product ID (1-based index)
          `"${product.name}"`,
          `"${product.description}"`,
          `"${product.polish || ""}"`,
          `"${product.category}"`,
          `"${product.subcategory || ""}"`,
          `"${product.barcode || ""}"`,
          `"${product.costPrice}"`,
          `"${size.size}"`, // Size
          `"${size.retailPrice}"`, // Retail Price
          `"${size.wholesalePrice}"`, // Wholesale Price
          `"${size.stock}"`, // Stock
          `"${size.thresholdStock}"`, // Threshold Stock
          `"${product.images.join(" | ")}"`, // Joining image URLs
        ];
      });
    });

    // Combine header and rows into CSV content
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  // Function to download the CSV file
  const downloadCSV = () => {
    const csvData = convertToCSV(products);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "product_list.csv"); // Set the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>

      {/* Button to trigger CSV export */}
      <button onClick={downloadCSV} className="export-csv-btn">
        Export to CSV
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Size</th>
            <th>Price (₹)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <button
                  onClick={() => handleProductClick(product)}
                  className="product-name"
                >
                  {product.name}
                </button>
              </td>
              <td>{product.category}</td>
              <td>{product.subcategory || "N/A"}</td>
              <td>{product.sizes.map((size) => size.size).join(", ")}</td>
              <td>{product.sizes.map((size) => size.retailPrice).join(", ")}</td>
              <td>{product.sizes.map((size) => size.stock).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing product details */}
      {selectedProduct && (
        <div className="product-detail-modal">
          <div className="product-detail-modal-content">
            <span className="product-detail-close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedProduct.name}</h2>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Polish:</strong> {selectedProduct.polish}
            </p>
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Subcategory:</strong> {selectedProduct.subcategory}
            </p>
            <p>
              <strong>Barcode:</strong> {selectedProduct.barcode}
            </p>
            <p>
              <strong>Cost Price:</strong> ₹{selectedProduct.costPrice}
            </p>
            <h3>Sizes:</h3>
            <ul>
              {selectedProduct.sizes.map((size, index) => (
                <li key={index}>
                  <strong>Size:</strong> {size.size} |{" "}
                  <strong>Retail Price:</strong> ₹{size.retailPrice} |{" "}
                  <strong>Wholesale Price:</strong> ₹{size.wholesalePrice} |{" "}
                  <strong>Stock:</strong> {size.stock} |{" "}
                  <strong>Threshold Stock:</strong> {size.thresholdStock}
                </li>
              ))}
            </ul>
            {selectedProduct.images.length > 0 && (
              <div>
                <h3>Product Images:</h3>
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${API_BASE_URL}/images/${image}`}
                    alt={`Product Image ${index + 1}`}
                    className="product-image"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
