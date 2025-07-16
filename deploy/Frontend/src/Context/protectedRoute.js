import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { authData } = useContext(AuthContext); // Get authData from AuthContext
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous check (you can replace this with actual auth checks if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a 1-second loading time

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (loading) {
    // Optionally, show a loading spinner or message
    return <div>Loading...</div>;
  }

  if (!authData.user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/loginSignUp" />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;