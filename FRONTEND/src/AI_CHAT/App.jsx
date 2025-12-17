import { useState } from "react";
import "./App.css";
import { MyContext } from "./MyContext";
import { Dashboard } from "./components/Dashboard";
import { v4 as uuidv4 } from "uuid";
import { Signup } from "./components/authComponents/Signup";
import { Login } from "./components/authComponents/Login";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import { EditProfile } from "./components/authComponents/EditProfile";
import StartingWindow from "./components/StartingWindow";


function AI_App() {
  const [newChat, setNewChat] = useState(true);
  const [prevChats, setPrevChats] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [allThreads, setAllThreads] = useState([]);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [toggleProfile, setToggleProfile] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const providerValues = {
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    prompt,
    setPrompt,
    reply,
    setReply,
    allThreads,
    setAllThreads,
    currThreadId,
    setCurrThreadId,
    toggleProfile, setToggleProfile,
    cardShow, setCardShow,
    userProfile, setUserProfile
  };

  return (
    <>
      <MyContext.Provider value={providerValues}>
        <Routes>
          {/* <Route path={"/"} element={<StartingWindow/>}/> */}
          <Route path={"/"} element={<Dashboard/>}/>
          {/* <Route path={"/signup"} element={<Signup/>}/> */}
          {/* <Route path={"/login"} element={<Login/>}/> */}
          {/* <Route path={"/edit"} element={<EditProfile/>}/> */}
          <Route path={"/*"} element={<NotFound/>}/>
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default AI_App;
