import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';

import logo from '../../assets/trailer_park.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import { logout } from '../../firebase';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        (!arrowRef.current || !arrowRef.current.contains(event.target))
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleArrowClick = () => setDropdownOpen((open) => !open);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>

        <ul className={`navbar-list ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">Home</li>
          <li className="navbar-item">TV Shows</li>
          <li className="navbar-item">Movies</li>
          <li className="navbar-item">New & Popular</li>
          <li className="navbar-item">My List</li>
          <li className="navbar-item">Browse by Languages</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img className="navbar-icon" src={search_icon} alt="Search" />
        <span className="navbar-children">Children</span>
        <img className="navbar-icon" src={bell_icon} alt="Notifications" />
        <div className="navbar-user-wrapper" ref={profileRef}>
          <img
            className="navbar-user"
            src={profile_img}
            alt="User"
            style={{ cursor: 'pointer' }}
          />
          <span
            className="navbar-arrow"
            ref={arrowRef}
            onClick={handleArrowClick}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', marginLeft: 4 }}
          >
            ▼
          </span>
          {dropdownOpen && (
            <div className="navbar-dropdown">
              <button onClick={logout} className="navbar-dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
