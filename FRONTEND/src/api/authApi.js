import { useContext, useEffect } from "react";
import { MyContext } from "../MyContext";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

export const useAuthApi = () => {
    const {userProfile, setUserProfile} = useContext(MyContext);
  const fetchUser = async () => {
    try {
      const url = `${API_URL}/user`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
    //   console.log(result.user);

      const { success, message } = result;
      if (success) {
        setUserProfile(result.user)
      }

    } catch (error) {
      console.log("Error during fetching user: ", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
//   console.log(userProfile)
  return { userProfile };
};

