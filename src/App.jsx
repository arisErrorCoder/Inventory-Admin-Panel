import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import ProductManagement from './components/ProductManagement/ProductManagement';
import BulkAction from './components/BulkAction/BulkAction';
import ProductList from './components/ProductList/ProductList';
import StockControl from './components/StockControl/StockControl';
import InventoryControl from './components/InventoryControl/InventoryControl';
import Dashboard from './components/Dashboard/Dashboard';
import AllOrders from './components/AllOrders/AllOrders';
import UserList from './components/UserList/UserList';
import UserRoleUpdate from './components/UserList/UserRoleUpdate';
import BillingSystem from './components/BillingSystem/BillingSystem';
import FAQ from './components/FAQ/FAQ';
import Login from './components/Login/Login';
import BarcodeScanner from './components/BarcodeGenerator/BarcodeScanner';
import CouponGenerator from './components/CouponGenerator/CouponGenerator';

// Sample Orders data
const sampleOrders = [
  {
    id: "001",
    status: "Processing", // Taking the status from the first dataset
    createdAt: "16/06/2021 at 04:23 PM", // From the second dataset
    customer: "John Doe", // Taking customer name from the first dataset
    customerEmail: "riya.sharma@gmail.com", // From the second dataset
    contactNumber: "987-654-3210", // From the second dataset
    deliveryName: "Home", // From the second dataset
    deliveryAddress: "MG Road, Sector 18, Noida, Uttar Pradesh, India", // From the second dataset
    deliveryContact: "981-234-5678", // From the second dataset
    billingName: "Workplace", // From the second dataset
    billingAddress: "Rohini Sector 11, Delhi, India", // From the second dataset
    billingContact: "921-345-6789", // From the second dataset
    paymentMethod: "Credit Card", // From the second dataset
    items: [
      ...[
        {
          photo: "https://img.tatacliq.com/images/i17//437Wx649H/MP000000022221975_437Wx649H_202405111811431.jpeg",
          name: "Gold Ring",
          category: "Gold Jewelry",
          subCategory: "Rings",
          sizes: [
            { size: "7", quantity: 1 },
            { size: "8", quantity: 2 },
          ],
          price: 20900.50,
        },
        {
          photo: "https://firsthub.in/public/uploads/all/KWf97invUVa8aEQcpGlnKsBjOPVh8eGlekCTrbRW.webp",
          name: "Gold Necklace",
          category: "Gold Jewelry",
          subCategory: "Necklaces",
          sizes: [{ size: "18 inches", quantity: 1 }],
          price: 32950.75,
        },
        {
          photo: "https://i.pinimg.com/736x/ea/90/1c/ea901c4f853943565b931e872778a004.jpg",
          name: "Gold Earrings",
          category: "Gold Jewelry",
          subCategory: "Earrings",
          sizes: [{ size: "One Size", quantity: 1 }],
          price: 14900.20,
        },
      ],
    ],
    subTotal: 118751.45, // Adding totals: 50000 + 68751.45
    shipping: "Free", // From the second dataset
    tax: 1239.79, // From the second dataset
    total: 119991.24, // Adding the total: 69991.24 + 50000
    sellerGST: "12AABCU0509R1ZV", // From the second dataset
    purchaseGST: "22AABCU0510R1ZV", // From the second dataset
  },
  {
    id: '002',
    customer: 'Jane Smith',
    product: 'Smartphone',
    category: 'Electronics',
    subcategory: 'Mobile Phones',
    quantity: 2,
    total: 40000,
    status: 'Shipped',
  },
];




const App = () => {
  const [activeContent, setActiveContent] = useState('dashboard');
  const [orders, setOrders] = useState(sampleOrders);
  const [user, setUser] = useState(null); // Store logged-in user
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      phone: "9876543210",
      email: 'john@example.com',
      role: "Retailer",
      orders: 5,
      totalValue: 15000,
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "9123456789",
      role: "Wholesaler",
      email: 'john@example.com',
      orders: 10,
      totalValue: 30000,
    },
    // Add more users as needed
  ]);
  const updateUserRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };
  const handleMenuClick = (menu) => {
    setActiveContent(menu);
  };

  return (
    <>
      <div className="app">
        <Router>
          {!user ? (
            <Login setUser={setUser} />
          ) : (
            <>
              <Sidebar onMenuClick={handleMenuClick} role={user.role} setUser={setUser} />
              <div className="main-content">
                {activeContent === 'dashboard' && <Dashboard />}
                {activeContent === 'Addnewproduct' && user.role === 'Admin' && <ProductManagement />}
                {activeContent === 'Bulkaction' && <BulkAction />}
                {activeContent === 'Productlist' && <ProductList />}
                {activeContent === 'StockControl' && <StockControl />}
                {activeContent === 'inventoryControl' && <InventoryControl />}
                {activeContent === 'allorders' && <AllOrders orders={orders} />}
                {activeContent === 'userlist' && user.role === 'Admin' && <UserList users={users}  updateUserRole={updateUserRole}/>}
                {activeContent === 'userroleupdate' && user.role === 'Admin' && <UserRoleUpdate users={users} updateUserRole={updateUserRole} />}
                {activeContent === 'billing' && <BillingSystem />}
                {activeContent === 'faq' && <FAQ />}
                {activeContent === 'BarcodeGenerate' && <BarcodeScanner />}
                {activeContent === 'CouponGenerate' && <CouponGenerator />}
              </div>
            </>
          )}
          {/* <Routes>
          <Route path="/login" element={<Login/>} />
          </Routes> */}
        </Router>
      </div>
    </>
  );
};

export default App;
