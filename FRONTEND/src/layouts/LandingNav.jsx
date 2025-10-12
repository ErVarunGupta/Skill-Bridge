import React, { useState } from "react";
import "./LandingNav.css";
import { useNavigate } from "react-router-dom";

function LandingNav() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
  return (
    <>
      {/* Navbar */}
      <header className="landing_page_navbar show">
        <h1 className="logo">Skill Bridge</h1>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <button
            className="signin-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        </nav>
      </header>

      <header className="landing_page_navbar hidden">
        <h1 className="logo">Skill Bridge</h1>
        <i class="fa-solid fa-bars" onClick={()=> setShow(!show)}></i>
      </header>

      <div className={show ? "nav-links-items items-show" : "nav-links-items items-hide"}>
        <button
            className="signin-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>
    </>
  );
}

export default LandingNav;
