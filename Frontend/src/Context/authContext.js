import React, { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: null,
    token: null,
  });

  // Load authentication state from sessionStorage when the app loads
  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    const savedToken = sessionStorage.getItem("authToken");

    if (savedUser && savedToken) {
      setAuthData({
        user: savedUser,
        token: savedToken,
      });
    }
  }, []);

  // Function to handle login
  const login = (user, token) => {
    sessionStorage.setItem("authToken", token); // Store token in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user)); // Store user details in sessionStorage
    setAuthData({ user, token });
  };

  // Function to handle logout
  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setAuthData({
      user: null,
      token: null,
    });
  };

  // Function to update user data
  const updateUserData = (updatedUser) => {
    // Update user data in session storage
    const updatedAuthData = { ...authData, user: { ...authData.user, ...updatedUser } };
    sessionStorage.setItem("user", JSON.stringify(updatedAuthData.user)); // Update session storage
    setAuthData(updatedAuthData); // Update state
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};