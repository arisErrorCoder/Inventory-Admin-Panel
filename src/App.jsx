import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; // Adjust the path as needed
import ProductPage from './components/ProductPage'; // Import your ProductPage component
import BrandsPage from './components/BrandsPage';
import ProductCategoriesPage from './components/ProductCategoriesPage';
import SuppliersPage from './components/SuppliersPage';
import Promotions from './components/Promotions';
import Dashboard from './components/Dashboard';
const App = () => {
  const [activeContent, setActiveContent] = useState('');

  const handleMenuClick = (menu) => {
    setActiveContent(menu);
  };

  return (
    <div className="app">
      <Sidebar onMenuClick={handleMenuClick} />
      <div className="main-content">
        {activeContent === 'Dashbord' && <Dashboard />}
        {activeContent === 'add-product' && <ProductPage />}
        {activeContent === 'Brands' && <BrandsPage />}
        {activeContent === 'categories' && <ProductCategoriesPage />}
        {activeContent === 'suppliers' && <SuppliersPage />}
        {activeContent === 'promotions' && <Promotions />}
        {/* You can add other conditions for different content as needed */}
      </div>
    </div>
  );
};

export default App;
