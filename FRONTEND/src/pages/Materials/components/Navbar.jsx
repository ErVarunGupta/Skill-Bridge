import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userId = decoded.id;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="study-navbar">
        <h1 onClick={() => navigate(`/dashboard`)}>StudyStack</h1>

        <ul className="show-items">
          <li><Link to="/study_stack">Dashboard</Link></li>
          <li><Link to="/my-notes">My Notes</Link></li>
          <li><Link to="/material_upload">Upload</Link></li>
          <li><Link to={`/show_profile/${userId}`}>Profile</Link></li>
        </ul>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      {/* Slide-in Sidebar */}
      <div className={`profile_sidebar ${isOpen ? "open" : ""}`}>
        <h2 style={{textAlign:'center'}}>Study Stack</h2>
        <ul className="hide-items">
          <li><Link to={`/show_profile/${userId}`} onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/study_stack" onClick={toggleMenu}>Dashboard</Link></li>
          <li><Link to="/my-notes" onClick={toggleMenu}>My Notes</Link></li>
          <li><Link to="/material_upload" onClick={toggleMenu}>Upload</Link></li>
        </ul>
      </div>

      {/* Overlay to close sidebar */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
