import React, { useState } from "react";
import "./LandingNav.css";
import { useNavigate } from "react-router-dom";

function LandingNav() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <header className="landing_page_navbar show">
        <h1 className="logo">Skill Bridge</h1>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <button
            className="signin-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="landing_page_navbar hidden">
        <h1 className="logo">Skill Bridge</h1>
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={() => setShow(!show)}
        ></i>
      </header>

      {/* Mobile Slide Menu */}
      <div className={`nav-links-items ${show ? "items-show" : "items-hide"}`}>
        <a href="#about" onClick={() => setShow(false)}>About</a>
        <a href="#features" onClick={() => setShow(false)}>Features</a>
        <a href="#contact" onClick={() => setShow(false)}>Contact</a>
        <button
          className="signin-btn"
          onClick={() => {
            navigate("/login");
            setShow(false);
          }}
        >
          Sign In
        </button>
      </div>

      {/* Optional Overlay for dim background */}
      {show && <div className="nav-overlay" onClick={() => setShow(false)}></div>}
    </>
  );
}

export default LandingNav;
