import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define a constant for the API base URL

// Create the Store Context
const StoreContext = createContext();

// Custom Hook for accessing the store
export const useStore = () => useContext(StoreContext);

// Store Provider Component
export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const API_BASE_URL = "https://gangacollection-backend.onrender.com/api";

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
      }
    };

    fetchProducts();
  }, []);

  // Function to add bulk products
  const value = {
    products,
    setProducts,
    API_BASE_URL,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
