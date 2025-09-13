import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="navbar">
      <div className="left_navbar">
        <div className="skill_bridge_icon">
          <Link to="/dashboard" className="skill_bridge_link">
            Skill Bridge
          </Link>
        </div>
      </div>
      <div className="right_navbar">
        <p>
          <Link to="/dashboard" className="nav_links">
            Home
          </Link>
        </p>
        <hr />
        <p>
          <Link to="/dashboard/upcoming_sessions" className="nav_links">
            Upcoming Session
          </Link>
        </p>
        <hr />
        <p>
          <Link to="/dashboard/accepted_requests" className="nav_links">
            Accepted Requests
          </Link>
        </p>
        <hr />
        <p>
          <Link to="/dashboard/accepted_offers" className="nav_links">
            Accepted Offers
          </Link>
        </p>
        <hr />
        <div
          className="profile_icon"
          onClick={() => setShowProfile(!showProfile)}
        >
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
      {showProfile && <ProfileCard />}
    </div>
  );
}

export const ProfileCard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setTimeout(()=>{
      navigate("/login")
    },1000);
  };
  return (
    <div className="profile_Card">
      <p>User Profile</p>
      <p onClick={logout}>Log Out</p>
    </div>
  );
};

export default Navbar;
