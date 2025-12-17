import { Link } from "react-router-dom";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { MyContext } from "../../MyContext";
const api_url = import.meta.env.VITE_BACKEND_URL;

export const EditProfile = () => {
  const {userProfile, setUserProfile} = useContext(MyContext);
  const [formData, setFormData] = useState({
    username: userProfile?.user?.username || "",
    email: userProfile?.user?.email || "",
    password: ""
  });

  const handleChange = (e) =>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


    const navigate = useNavigate();
    const formSubmitHandler = async(formData) =>{
        const formInputData = Object.fromEntries(formData.entries());
        console.log(formInputData);

        const token = localStorage.getItem('token');
        if(!token){
            alert('You are not authorize!')
            return
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        try {
            const url = `${api_url}/user/${userId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": token
                },
                body: JSON.stringify(formInputData)
            })

            const data = await response.json();
            console.log(data);

            const {message, success} = data;
            if(success){
                alert(message)
                setTimeout(()=>{
                    navigate("/dashboard")
                }, 1000)
            }
            else{
              alert(message)
            }

        } catch (error) {
            alert('Update failed')
            console.log("Update failed: ", error.message);
        }
    }
  return (
    <div className="auth-container">
      <div>
        <h1>Edit Profile</h1>
      </div>
      <form action={formSubmitHandler} className="form-container">
        <div className="inner-container">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="inner-container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="inner-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit" className="form-btn">Submit</button>
      </form>
    </div>
  );
};
