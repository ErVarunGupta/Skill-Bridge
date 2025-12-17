import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { LuSend } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";
import {ScaleLoader} from "react-spinners";
import Chat from "./Chat";
import { MyContext } from "../../MyContext";
import './RightComponent.css'
const api_url = import.meta.env.VITE_BACKEND_URL;

export const RightComponent = () => {
  const {reply, setReply, prompt, setPrompt, prevChats, setPrevChats, newChat, setNewChat, currThreadId} = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    const token = localStorage.getItem('token')
    setLoading(true);
    setNewChat(false);
    try {
      // const inputdivData = Object.fromEntries(divData.entries());
      const url = `${api_url}/chat`;

      const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            threadId: currThreadId,
            message: prompt,
          }),
        });

        const data = await response.json();
        console.log(data);
       
        setReply(data.replyFromAI);
    } catch (error) {
      console.log("Error during fetching data from backend: ", error);
    }
    setLoading(false);
  };

  useEffect(()=>{
    // console.log(prevChats)
    if(prompt && reply){
      setPrevChats([...prevChats, {
        role: "user", 
        content: prompt
      },{
        role: 'assistant',
        content: reply
      }])
    }
  }, [reply])


  return (
    <>
        <Navbar />
        <Chat/>
        <div className="loader">
          <ScaleLoader color="#fff" loading={loading} />
        </div>
      <div className="main-container">
        <div className="input-box">
           <input
              type="text"
              name="message"
              id="message"
              placeholder="Ask anything"
              value={prompt}
              onChange={(e)=> setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter'? getReply() : null}
            />
            <button type="submit" className="send-icon" onClick={getReply}>
              <LuSend />
            </button>
        </div>
      </div>
      <div className="chat-footer">
        <p >ChatGPT can make mistakes. Check important info. See Cookie Preferences.</p>
      </div>
    </>
  );
};
