import React, { useState } from "react";
import "./Navbar.css";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../Assets/logo.png";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Badge from "@mui/material/Badge";
import { useAuth } from "../../Context/authContext";

import DropdownMenu from "../Dropdown/DropdownMenu";

const Navbar = () => {
  const { authData } = useAuth();
  const cart = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={scrollToTop}>
                  SHOP
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={scrollToTop}>
                  BLOG
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={22} onClick={scrollToTop} />
          {authData.user ? (
             <div className="account-dropdown-container">
             <DropdownMenu />
            </div>
          ) : (
            <Link to="/loginSignUp" onClick={scrollToTop} className="signin-link">
              <FaRegUser size={22} />
              <span className="signin-text">Sign In</span>
            </Link>
          )}

          <Link to="/cart" onClick={scrollToTop}>
            <Badge badgeContent={cart.items.length || "0"} color="primary">
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
          <FiHeart size={22} onClick={scrollToTop} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart">
            <Badge badgeContent={cart.items.length || "0"} color="primary">
              <RiShoppingBagLine size={22} color="black" />
            </Badge>
          </Link>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Search products" />
                <Link to="/shop">
                  <FiSearch size={22} onClick={toggleMobileMenu} />
                </Link>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                <li>
                  <Link to="/" onClick={toggleMobileMenu}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/shop" onClick={toggleMobileMenu}>
                    SHOP
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={toggleMobileMenu}>
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={toggleMobileMenu}>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={toggleMobileMenu}>
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              {authData.user ? (
                <Link to="/account" onClick={toggleMobileMenu}>
                  <FaRegUser size={22} />
                  <span className="signin-text">
                     {authData.user.displayName ? authData.user.displayName.toUpperCase() : 'MY'} ACCOUNT
              </span>
                </Link>
              ) : (
                <Link to="/loginSignUp" onClick={toggleMobileMenu}>
                  <FaRegUser size={22} />
                  <span className="signin-text">My Account</span>
                </Link>
              )}
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>Language</p>
                <select name="language" id="language">
                  <option value="English">English</option>
                  <option value="Bangla">Bangla</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>Currency</p>
                <select name="currency" id="currency">
                  <option value="USD">$ USD</option>
                  <option value="BDT">৳ BDT</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP" selected>£ GBP</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <a
                            href="https://www.facebook.com/swiftshopbd"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebookF />
                          </a>
                          <a href="" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                          </a>
                          <a href="" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                          </a>
                          <a href="" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                          </a>
                          <a href="" target="_blank" rel="noopener noreferrer">
                            <FaPinterest />
                          </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;