import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { MyContext } from "../MyContext";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="navbar">
      <div className="left_navbar">
        <div className="skill_bridge_icon">
          <NavLink to="/dashboard" className="skill_bridge_link"
          >
            Skill Bridge
          </NavLink>
        </div>
      </div>
      <div className="right_navbar">
        <p>
          <NavLink to="/dashboard/help" className={({isActive}) => isActive? "nav_links active": "nav_links deactive"}>
            Home
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink to="/dashboard/upcoming_sessions" className={({isActive}) => isActive? "nav_links active": "nav_links deactive"}>
            Upcoming Session
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink to="/dashboard/accepted_requests" className={({isActive}) => isActive? "nav_links active": "nav_links deactive"}>
            Accepted Requests
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink to="/dashboard/accepted_offers" className={({isActive}) => isActive? "nav_links active": "nav_links deactive"}>
            Accepted Offers
          </NavLink>
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
  // const {userProfile} = useContext(MyContext);
  // console.log(userProfile)

  const logout = () => {
    localStorage.clear();
    setTimeout(()=>{
      navigate("/login")
    },1000);
  };
  return (
    <div className="profile_Card">
      <p><NavLink to="/show_profile" style={{textDecoration:'none', color: '#000'}}>User Profile</NavLink></p>
      {/* <p><Link to="/update_profile" style={{textDecoration:'none', color: '#000'}}>Edit Profile</Link></p> */}
      <p onClick={logout}>Log Out</p>
    </div>
  );
};

export default Navbar;
