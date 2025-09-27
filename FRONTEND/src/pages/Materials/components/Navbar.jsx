import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userId = decoded.id;
  return (
    <nav className="study-navbar">
      <h1 onClick={()=> navigate(`/dashboard`)}>StudyStack</h1>
      <ul>
        <li><Link to="/study_stack">Dashboard</Link></li>
        <li><Link to="/my-notes">My Notes</Link></li>
        <li><Link to="/material_upload">Upload</Link></li>
        <li><Link to={`/show_profile/${userId}`}>Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
