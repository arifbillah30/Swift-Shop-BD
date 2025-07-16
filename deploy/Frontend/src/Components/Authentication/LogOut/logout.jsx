// Frontend/src/Components/Authentication/LogOut/logout.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/authContext'; // Adjust the path based on your folder structure

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get the logout function from AuthContext

  useEffect(() => {
    const handleLogout = () => {
      logout(); // Call the logout function
      sessionStorage.removeItem('authToken'); // Clear any tokens or user data
      navigate('/'); // Redirect to the home page
    };

    handleLogout(); // Call the logout function when the component mounts
  }, [logout, navigate]); // Dependency array to prevent unnecessary re-renders

};

export default Logout;
