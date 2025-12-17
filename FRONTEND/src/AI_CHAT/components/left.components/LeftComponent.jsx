import React, { useContext, useEffect } from "react";
import { PiNotePencil } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { MdPhotoLibrary } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdWindow } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import {jwtDecode} from 'jwt-decode'

const api_url = import.meta.env.VITE_BACKEND_URL;

import "./LeftComponent.css";
import LeftNavbar from "./LeftNavbar";
import { MyContext } from "../../MyContext";

export const LeftComponent = () => {
  const {
    currThreadId,
    setCurrThreadId,
    allThreads,
    setAllThreads,
    setNewChat,
    prompt,
    setPrompt,
    reply,
    setReply,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);

  // let threadArr = [];

  // const fetchThread = async(threadId) =>{
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/thread/${threadId}`);
  //     const data = await response.json();
  //     // console.log(data.response);
  //     const filterdThread = data.response.map((thread)=>({
  //       threadId: thread.threadId,
  //       title: thread.title,
  //       createdAt: thread.createdAt
  //     }))
  //     console.log(filterdThread);
  //     // threadArr.push(...filterdThread);
  //   } catch (error) {
  //     console.log('error during fetching thread: ', error);
  //   }
  // }

  // setAllThreads(fetchThread);

  // const fetchThreadByUser = async() =>{
  //   try {
  //     const token = localStorage.getItem('token');
  //     if(!token){
  //       alert('You are not authorize')
  //       return;
  //     }
  //     const decoded = jwtDecode(token);
  //     const userId = decoded.id;
  //     const response = await fetch(`http://localhost:8080/user/${userId}`);
  //     const data = await response.json();

  //     // console.log("user thread:" ,data.user.threads);

  //     data.user.threads.map((threadId) => fetchThread(threadId));
  //     // console.log("fetch thread user: ",filterdThread)
  //     // setAllThreads(filterdThread);
  //   } catch (error) {
  //     console.log('error during fetching thread by user: ', error);
  //   }
  // }

  // useEffect(()=>{
  //   fetchThreadByUser();
  // },[])

  const fetchTitle = async () => {
    try {
      const url = `${api_url}/thread`;

      const response = await fetch(url);
      const data = await response.json();

      const filterdThread = data.response.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
        updatedAt: thread.updatedAt,
      }));
      // console.log("all thread: ", data.response);
      console.log("fetch title:",filterdThread);
      setAllThreads(filterdThread);
    } catch (error) {
      console.log("error during fetching thread: ", error);
    }
  };

    const createNewChat = () => {
    setNewChat(true);
    setCurrThreadId(uuidv4());
    setPrompt("");
    setReply(null);
    setPrevChats([]);
  };
 

  const changeThread = async (threadId) => {
    try {
      const url = `${api_url}/api/thread/${threadId}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.response[0].messages);

      setCurrThreadId(threadId);
      setPrevChats(data.response[0].messages);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.log("Error during changing thread: ", error);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const url = `${api_url}/api/thread/${threadId}`;
      const response = await fetch(url, {
        method: "DELETE"
      });

      const data = await response.json();
      // console.log(data);

      setAllThreads(prev => prev.filter((thread) => thread.threadId !== threadId ));
      if(threadId === currThreadId){
        createNewChat();
      }
    } catch (error) {
      console.log("Error during deleting thread: ", error);
    }
  };


   useEffect(() => {
    fetchTitle()
    // fetchThreadByUser();
  }, [currThreadId]);



  return (
    <>
      <LeftNavbar />
      <section className="section-container">
        <div className="new-chat-container">
          <ul>
            <li onClick={createNewChat}>
              <PiNotePencil /> New chat
            </li>
            <li>
              <IoSearch /> Search chats
            </li>
            <li>
              <MdPhotoLibrary /> Library
            </li>
           
          </ul>
        </div>

        <div className="history-container">
          <p>Chats</p>
          <div className="histories">
            <ul>
              {allThreads
                .slice()
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((thread) => (
                  <li
                    key={thread.threadId}
                    onClick={() => changeThread(thread.threadId)}
                    className={currThreadId === thread.threadId? "runnigThread": "pastThread"}
                  >
                    {thread.title}

                    <span onClick={(e)=> {
                      e.stopPropagation()
                      deleteThread(thread.threadId)
                    }}>
                      <RiDeleteBin6Line />
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <footer className="sidebar-footer">
          <p>By Varun Kumar</p>
        </footer>
      </section>
    </>
  );
};
