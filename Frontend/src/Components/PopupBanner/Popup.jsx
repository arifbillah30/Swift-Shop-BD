import React, { useState } from "react";
import "./Popup.css";

import popupImg from "../../Assets/newsletter-popup.png";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className={`popup-content ${fadeOut ? "fade-out" : ""}`}>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <div className="popup-left">
            <img src={popupImg} alt="Newsletter" />
          </div>
          <div className="popup-right">
            <h2>Sign Up to Get Free Delivery</h2>
            <p>
            You'll get free delivery on your first order.
            </p>
            <form>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">JOIN</button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
