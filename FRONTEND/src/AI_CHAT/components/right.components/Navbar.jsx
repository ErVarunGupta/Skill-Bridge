import React, { useState } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { FaCloudArrowUp } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";

import { jwtDecode } from "jwt-decode";

import UserCard from "../authComponents/UserCard";

import "./RightComponent.css";
import { useContext } from "react";
import { MyContext } from "../../MyContext";

export const Navbar = () => {
  const { cardShow, setCardShow } = useContext(MyContext);
  const cardToggle = (e) => {
    setCardShow(!cardShow);
  };

  

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <h3>
          ApnaAI <HiMiniChevronDown />
        </h3>
      </div>
      <div className="nav-right">
        <div>
          <FiShare /> Share
        </div>
        <div onClick={cardToggle} className="profile-icon">
          <CgProfile />
        </div>
      </div>
      {cardShow ? <Card /> : ""}
    </nav>
  );
};

const Card = () => {
  const { toggleProfile, setToggleProfile } = useContext(MyContext);
  const navigate = useNavigate();

  const decoded = jwtDecode(localStorage.getItem("token"));
    const userId = decoded.id;
  const logoutAction = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const getUserDetails = async (e) => {
    setToggleProfile(true);
  };

  return (
    <div className="Card">
      <NavLink
        to={`/show_profile/${userId}`}
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <FaUser /> User profile
      </NavLink>
      <NavLink style={{ textDecoration: "none", color: "#fff" }}>
        <IoSettingsOutline /> Settings
      </NavLink>
      <NavLink style={{ textDecoration: "none", color: "#fff" }}>
        <FaCloudArrowUp /> Upgrade plan
      </NavLink>
      <NavLink
        onClick={logoutAction}
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <MdOutlineLogout /> Log out
      </NavLink>
      {toggleProfile ? <UserCard /> : ""}
    </div>
  );
};
