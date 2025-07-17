import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="banner">
      <div className="bannerLeft">
        <h6 className="bannerh6">Starting At £39</h6>
        <h3 className="bannerh3">Living Room</h3>
        <h5 className="bannerh5">
          <Link
            to="/shop"
            onClick={scrollToTop}
            className="shopNowLink"
            aria-label="Shop Living Room"
          >
            Shop Now
          </Link>
        </h5>
      </div>
      <div className="bannerRgt">
        <h6 className="bannerh6">Starting At £19</h6>
        <h3 className="bannerh3">Bed Room</h3>
        <h5 className="bannerh5">
          <Link
            to="/shop"
            onClick={scrollToTop}
            className="shopNowLink"
            aria-label="Shop Bed Room"
          >
            Shop Now
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Banner;