import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userId = decoded.id;
  // const {userProfile} = useContext(MyContext);
  // console.log(userProfile)

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="navbar">
      <div className="left_navbar">
        <div className="skill_bridge_icon">
          <NavLink to="/dashboard" className="skill_bridge_link">
            Skill Bridge
          </NavLink>
        </div>
      </div>
      <div
        className={
          showItems
            ? "navbar_items show_navbar_items"
            : "navbar_items hide_navbar_items"
        }
      >
        <div
          className="profile_icon"
        >
          <img src={localStorage.getItem("profilePicture")} alt="" />
        </div>
        <hr />

        <p>
          <NavLink
            to={`/show_profile/${userId}`}
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            <i class="fa-solid fa-user"></i>
            User Profile
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/study_stack"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            <i class="fa-solid fa-book" to="/material_details"></i> Study
            Materials
          </NavLink>
        </p>

        

        <hr />

        <p>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Home
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/dashboard/post"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Ask Doubts
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/dashboard/upcoming_sessions"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Upcoming Session
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/dashboard/accepted_requests"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Accepted Requests
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/dashboard/accepted_offers"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Accepted Offers
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/dashboard/completed_requests"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Completed Requests
          </NavLink>
        </p>

        <hr />

        <p onClick={logout} style={{color:'red'}}>
            <i class="fa-solid fa-right-from-bracket"></i>Log Out
        </p>
      </div>
      <div className="right_navbar">
        <p>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Home
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink
            to="/dashboard/post"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Ask Doubts
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink
            to="/dashboard/upcoming_sessions"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Upcoming Session
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink
            to="/dashboard/accepted_requests"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Accepted Requests
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink
            to="/dashboard/accepted_offers"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Accepted Offers
          </NavLink>
        </p>
        <hr />
        <p>
          <NavLink
            to="/dashboard/completed_requests"
            className={({ isActive }) =>
              isActive ? "nav_links active" : "nav_links deactive"
            }
          >
            Completed Requests
          </NavLink>
        </p>
        <hr />
        <div
          className="profile_icon"
          onClick={() => setShowProfile(!showProfile)}
        >
          {/* <i className="fa-solid fa-user"></i> */}
          <img src={localStorage.getItem("profilePicture")} alt="" />
        </div>
      </div>
      <div className="hamburger" onClick={() => setShowItems(!showItems)}>
        <i class="fa-solid fa-bars"></i>
      </div>
      {showProfile && <ProfileCard />}
    </div>
  );
}

export const ProfileCard = () => {
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userId = decoded.id;
  // const {userProfile} = useContext(MyContext);
  // console.log(userProfile)

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className="profile_Card">
      <p>
        <i class="fa-solid fa-user"></i>
        <NavLink
          to={`/show_profile/${userId}`}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          User Profile
        </NavLink>
      </p>
      <p>
        <NavLink
          to="/study_stack"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <i class="fa-solid fa-book" to="/material_details"></i> Study
          Materials
        </NavLink>
      </p>
      <p>
        <NavLink to="/ai_chat"
          style={{ textDecoration: "none", color: "#fff" }}>🤖 Chat with AI</NavLink>
      </p>

      <p onClick={logout}>
        <i class="fa-solid fa-right-from-bracket"></i>Log Out
      </p>
    </div>
  );
};

export default Navbar;
