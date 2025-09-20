import React from "react";
import "./Home.css";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { getUsersProfile } from "../../api/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { setUsers } = useContext(MyContext);
  const { users } = getUsersProfile();
    console.log(users.users);
  useEffect(() => {
    setUsers(users.length > 0 ? users?.users : []);
  }, [setUsers]);
  return (
    <section className="home-container">
      <div className="search-field">
        <input type="text" placeholder="Search your favorite helper..." />
      </div>
      <div className="users-field">
        <h2>Top Recommended Helpers</h2>
        <div className="cards-container">
          {!users?.users ? (
            <div className="loading">Loading...</div>
          ) : (
            users?.users?.map((user) => (
              <div className="user-card" key={user._id}>
                <img
                  className="profile-pic"
                  src={user.userId.profilePicture}
                  alt={user.name}
                  onClick={() => navigate(`/show_profile/${user.userId._id}`)}
                />
                <h3>{user.name}</h3>
                <p className="username">@{user.userId.username}</p>
                <p className="email">{user.userId.email}</p>
                <p className="bio">{user.bio}</p>
                <div className="rating">
                  <span>⭐ {user.averageRating.toFixed(1)}</span>
                  <span>({user.totalReviews} reviews)</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
