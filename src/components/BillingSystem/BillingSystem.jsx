import React, { useState, useEffect } from 'react';
import "./BillingSystem.css";
import { jsPDF } from 'jspdf';
import { useStore } from '../Context/Store';
import BarcodeScannerComponent from "react-qr-barcode-scanner"; // Barcode scanner component
import { Trash } from 'phosphor-react';

const BillingSystem = () => {
  const { products } = useStore();
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [isBarcodeMode, setIsBarcodeMode] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'Cash'
  });
  const [isBarcodeScanning, setIsBarcodeScanning] = useState(false); // State to handle barcode scanning mode
  const [isMobile, setIsMobile] = useState(false); // State to determine if the device is mobile

  useEffect(() => {
    // Detect if the screen width is mobile or desktop
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Consider 768px and below as mobile
    };

    checkIfMobile(); // Check on initial render

    window.addEventListener('resize', checkIfMobile); // Check on window resize

    return () => window.removeEventListener('resize', checkIfMobile); // Cleanup on unmount
  }, []);

  // Add Product to Order List
  const addToOrder = (product, sizeDetails, quantity) => {
    setOrderList((prevList) => [
      ...prevList,
      {
        ...product,
        size: sizeDetails.size,
        price: sizeDetails.retailPrice,
        quantity: quantity,
        totalPrice: sizeDetails.retailPrice * quantity
      }
    ]);
  };

  // Handle Barcode Scan
  const handleBarcodeScan = (result) => {
    if (result) {
      setScannedBarcode(result.text); // Update the barcode input with scanned value
      let productFound = false;
  
      // Search for the product by barcode
      products.forEach((product) => {
        const sizeDetails = product.sizes.find((size) => size.barcode === result.text);
        if (sizeDetails) {
          addToOrder(product, sizeDetails, 1); // Add with default quantity of 1
          productFound = true;
        }
      });
  
      if (!productFound) {
        alert('Product not found for this barcode.');
      }
  
      // Close the barcode scanner on mobile after successful scan
      if (isMobile) {
        setIsBarcodeMode(false); // Hide the barcode scanner
      }
    }
  };
  

  // Handle Product Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sizes.some(size => size.barcode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle Quantity Change for Order List
  const handleQuantityChange = (index, quantity) => {
    const updatedOrderList = [...orderList];
    updatedOrderList[index].quantity = quantity;
    updatedOrderList[index].totalPrice = updatedOrderList[index].price * quantity;
    setOrderList(updatedOrderList);
  };

  // Handle Bill Download (PDF format)
  const downloadBill = () => {
    const doc = new jsPDF();

    // Header with Company Branding
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Company Name', 14, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('www.yourcompany.com', 14, 25);

    // Date and Time
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
    doc.text(`Date: ${dateString}`, 160, 20);

    // Customer Details Section
    doc.setFontSize(14);
    doc.text('Bill To:', 14, 35);
    doc.setFontSize(12);
    doc.text(`Name: ${customerInfo.name}`, 14, 40);
    doc.text(`Address: ${customerInfo.address}`, 14, 45);
    doc.text(`Phone: ${customerInfo.phone}`, 14, 50);

    // Itemized Product List
    doc.setFontSize(14);
    doc.text('Itemized List:', 14, 60);
    doc.setFontSize(12);
    let yPosition = 70;
    doc.text('Product Name', 14, yPosition);
    doc.text('Size', 80, yPosition);
    doc.text('Quantity', 130, yPosition);
    doc.text('Unit Price', 170, yPosition);
    doc.text('Total', 210, yPosition);
    yPosition += 10;

    orderList.forEach((item) => {
      doc.text(item.name, 14, yPosition);
      doc.text(item.size, 80, yPosition);
      doc.text(item.quantity.toString(), 130, yPosition);
      doc.text(`₹${item.price}`, 170, yPosition);
      doc.text(`₹${item.totalPrice}`, 210, yPosition);
      yPosition += 10;
    });

    // Total Calculation
    const totalAmount = orderList.reduce((acc, item) => acc + item.totalPrice, 0);
    doc.text(`Total: ₹${totalAmount}`, 14, yPosition + 10);

    // Footer with Notes
    doc.setFontSize(10);
    doc.text('Thank you for your purchase!', 14, yPosition + 30);
    doc.text('For any inquiries, contact us at: support@yourcompany.com', 14, yPosition + 35);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  const removeItemFromOrder = (index) => {
    setOrderList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="billing-system">
      {/* Search and Barcode Mode Toggle */}
      <div className="search-barcode-toggle">
        <input
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isBarcodeMode}
        />
        <button onClick={() => setIsBarcodeMode(!isBarcodeMode)}>
          {isBarcodeMode ? 'Switch to Search Mode' : 'Switch to Barcode Mode'}
        </button>
      </div>

      {/* Mobile Camera Barcode Scanner (Visible Only on Mobile) */}
      {isBarcodeMode && isMobile && (
        <div className="barcode-scanner">
          <input
            type="text"
            placeholder="Scan Barcode"
            value={scannedBarcode}
            onChange={(e) => setScannedBarcode(e.target.value)}
          />
          <BarcodeScannerComponent
            onUpdate={(_, result) => handleBarcodeScan(result)}
            width={300}
            height={200}
          />
        </div>
      )}

      {/* External Barcode Scanner (Visible Only on Desktop) */}
      {isBarcodeMode && !isMobile && (
        <div className="barcode-scanner-desktop">
          <input
            type="text"
            placeholder="Scan Barcode"
            value={scannedBarcode}
            onChange={(e) => setScannedBarcode(e.target.value)}
          />
        </div>
      )}

      {/* Product List (Only shows after searching) */}
      {searchQuery && !isBarcodeMode && (
        <div className="product-list">
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.itemcode} className="product-item">
                <span>{product.name}</span>
                <span>Description: {product.description}</span>
                <span>Polish: {product.polish}</span>
                <span>Category: {product.category}</span>
                <span>Subcategory: {product.subcategory}</span>
                <span>
                  Price: ₹
                  {
                    product.sizes.find(s => s.size === product.sizes[0]?.size)?.retailPrice || product.sizes[0]?.retailPrice
                  }
                </span>

                {/* Size Selection */}
                <select
                  // Selecting the first available size as default
                  value={product.sizes[0]?.size || ''}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map((size) => (
                    <option key={size.size} value={size.size}>
                      {size.size} - ₹{size.retailPrice}
                    </option>
                  ))}
                </select>

                {/* Quantity Input */}
                <input
                  type="number"
                  value={1}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="quantity-input"
                />

                <button onClick={() => addToOrder(product, product.sizes[0], 1)} className="add-to-order-btn">
                  Add to Order
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Order List */}
      <div className="order-list">
    <h3>Order List</h3>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Price</th>
          <th>Remove</th> {/* Add Remove column */}
        </tr>
      </thead>
      <tbody>
        {orderList.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.size}</td>
            <td>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                className="quantity-input"
              />
            </td>
            <td>₹{item.price}</td>
            <td>₹{item.totalPrice}</td>
            <td>
              <Trash
                size={20} // You can adjust the size here
                color="red" // Set the icon color
                weight="bold" // Choose a weight for the icon
                onClick={() => removeItemFromOrder(index)} // Remove function
                className="remove-icon"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="total">
      Total: ₹{orderList.reduce((acc, item) => acc + item.totalPrice, 0)}
    </div>
  </div>

      {/* Customer Information */}
      <div className="customer-info">
        <h3>Customer Information</h3>
        <input
          type="text"
          placeholder="Name"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
        />
        <select
          value={customerInfo.paymentMethod}
          onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      {/* Download Bill Button */}
      <button className="download-bill-btn" onClick={downloadBill}>
        Download Bill
      </button>
    </div>
  );
};

export default BillingSystem;
