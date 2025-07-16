import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css'; 
import { useAuth } from "../../Context/authContext";

const DropdownMenu = () => {
  const { authData } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navigation__item" ref={dropdownRef}>
      <span className="navigation__item" onClick={handleToggleDropdown}>
        {/* Check for authData.user and displayName before accessing toUpperCase */}
        {(authData.user && authData.user.displayName) ? `${authData.user.displayName.toUpperCase()}'S ACCOUNT` : "ACCOUNT"}
      </span>

      {isDropdownVisible && (
        <div className="sub-menu">
          <ul className="list-unstyled">
            <li className="sub-menu__item">
              <Link to="/account-details">My Account</Link>
            </li>
            <li className="sub-menu__item">
              <Link to="/store_location">Store Locator</Link>
            </li>
            <li className="sub-menu__item">
              <Link to="/logout">Log Out</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
