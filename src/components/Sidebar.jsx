import React, { useState } from 'react';
import { HouseSimple, User, CalendarBlank, ChartBar, FileText, Gear, Info, SignOut } from 'phosphor-react';

const Sidebar = ({ onMenuClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleMenuItemClick = (menu) => {
    if (menu === 'viewers') {
      setActiveMenu('viewers');
      onMenuClick('add-product');
       // Set default content to "add-product"
    }
    // if (menu === 'dashboard') {
    //   setActiveMenu('dashboard');
    //   onMenuClick('Dashbord'); }
    
    else {
      setActiveMenu(menu === activeMenu ? '' : menu);
      onMenuClick(menu);
    }
  };

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className="menu-btn" onClick={toggleSidebar}>
        <i className={`ph-bold ${isActive ? 'ph-caret-right' : 'ph-caret-left'}`}></i>
      </div>
      <div className="head">
        <div className="user-img">
          <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png" alt="" />
        </div>
        <div className="user-details">
          <p className="title">Hukka</p>
          <p className="name">Admin :Name</p>
        </div>
      </div>
      <div className="nav">
        <div className="menu">
          <p className="title">Main</p>
          <ul>
            <li className={activeMenu === 'dashboard' ? 'active' : ''}>
              <a href="#" onClick={() => handleMenuItemClick('Dashbord')}>
                <i className="icon ph-bold ph-house-simple"></i>
                <span className="text">Dashboard</span>
              </a>
            </li>
            {/* <li className={activeMenu === 'dashboard' ? 'active' : ''}>
                  <a href="#" onClick={() => handleMenuItemClick('Dashbord')}>
                  </a>
                </li> */}
            <li className={activeMenu === 'viewers' ? 'active' : ''}>
              <a href="#" onClick={() => handleMenuItemClick('viewers')}>
                <i className="icon ph-bold ph-user"></i>
                <span className="text">Catalog</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu" style={{ display: activeMenu === 'viewers' ? 'block' : 'none' }}>
                <li className={activeMenu === 'add-product' ? 'active' : ''}>
                  <a href="#" onClick={() => handleMenuItemClick('add-product')}>
                    <span className="text">Product</span>
                  </a>
                </li>
                <li className={activeMenu === 'promotions' ? 'active' : ''}>
                  <a href="#" onClick={() => handleMenuItemClick('promotions')}>
                    <span className="text">Promotions</span>
                  </a>
                </li>
                <li className={activeMenu === 'Brands' ? 'active' : ''}>
                  <a href="#" onClick={() => handleMenuItemClick('Brands')}>
                    <span className="text">Brands</span>
                  </a>
                </li>
                <li className={activeMenu === 'suppliers' ? 'active' : ''}>
                  <a href="#" onClick={() => handleMenuItemClick('suppliers')}>
                    <span className="text">Suppliers</span>
                  </a>
                </li>
                <li className={activeMenu === 'categories' ? 'active' : ''}>
                  <a href="#" onClick={() => handleMenuItemClick('categories')}>
                    <span className="text">Product categories</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={activeMenu === 'agenda' ? 'active' : ''}>
              <a href="#" onClick={() => handleMenuItemClick('agenda')}>
                <i className="icon ph-bold ph-calendar-blank"></i>
                <span className="text">Inventory</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu" style={{ display: activeMenu === 'agenda' ? 'block' : 'none' }}>
                <li><a href="#">Stock Control</a></li>
                <li><a href="#">Inventory Counts</a></li>
              </ul>
            </li>
            <li className={activeMenu === 'revenue' ? 'active' : ''}>
              <a href="#" onClick={() => handleMenuItemClick('revenue')}>
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="text">Revenue</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu" style={{ display: activeMenu === 'revenue' ? 'block' : 'none' }}>
                <li><a href="#">Earnings</a></li>
                <li><a href="#">Funds</a></li>
                <li><a href="#">Declines</a></li>
                <li><a href="#">Payouts</a></li>
              </ul>
            </li>
            <li className={activeMenu === 'articles' ? 'active' : ''}>
              <a href="#" onClick={() => handleMenuItemClick('articles')}>
                <i className="icon ph-bold ph-file-text"></i>
                <span className="text">Articles</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="menu">
          <p className="title">Settings</p>
          <ul>
            <li className={activeMenu === 'settings' ? 'active' : ''}>
              <a href="#" onClick={() => handleMenuItemClick('settings')}>
                <i className="icon ph-bold ph-gear"></i>
                <span className="text">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="menu">
        <p className="title">Account</p>
        <ul>
          <li className={activeMenu === 'faq' ? 'active' : ''}>
            <a href="#" onClick={() => handleMenuItemClick('faq')}>
              <i className="icon ph-bold ph-info"></i>
              <span className="text">FAQ</span>
            </a>
          </li>
          <li className={activeMenu === 'logout' ? 'active' : ''}>
            <a href="#" onClick={() => handleMenuItemClick('logout')}>
              <i className="icon ph-bold ph-sign-out"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
