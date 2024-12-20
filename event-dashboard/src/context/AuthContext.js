import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      if (response.data.token) {
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token); // Save token to localStorage
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
