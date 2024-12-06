// ProductContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
const ProductContext = createContext();

// Create a provider component
const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:7000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProductList(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ productList, loading, error, setProductList }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
