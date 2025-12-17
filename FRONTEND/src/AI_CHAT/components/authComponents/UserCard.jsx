import { useContext } from "react";
import "./UserCard.css";
import { MyContext } from "../../MyContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { RiCloseFill } from "react-icons/ri";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const api_url = import.meta.env.VITE_BACKEND_URL;

const UserCard = () => {
  const { userProfile, setUserProfile, toggleProfile, setToggleProfile } =
    useContext(MyContext);

    const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const url = `${api_url}/user/${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      setUserProfile(data);
    } catch (error) {
      console.log("Error during login in frontend: ", error);
    }
  };

  const hideProfile = () => {
    setToggleProfile(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const deleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
      }
      const decode = jwtDecode(token);
      const userId = decode.id;
      const url = `${api_url}/user/${userId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const deletedUser = await response.json();
      const { success, message } = deletedUser;
      if (success) {
        alert(message);
        localStorage.clear();
        setTimeout(()=>{
          navigate('/login');
        }, 1000)
      }
      console.log("deletedUser: ", deletedUser);
    } catch (error) {
      alert("Internal server error");
      console.log(error);
    }
  };
  return (
    <div className="user-container">
      <div className="cross-icon" onClick={hideProfile}>
        <RiCloseFill />
      </div>
      <h2 style={{ color: "#fff" }}>User Profile</h2>
      <div className="info-container">
        <p>
          <span>Username</span>: @{userProfile?.user?.username || "Loading..."}
        </p>
        <p>
          <span>Email</span>: {userProfile?.user?.email || "Loading..."}
        </p>
      </div>
      <div className="btn-container">
        <Link to="/edit" className="edit-btn">Edit</Link>
        <button className="delete-btn" onClick={deleteProfile}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
