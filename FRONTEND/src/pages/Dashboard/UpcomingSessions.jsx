import React, { useContext, useEffect } from 'react'
import { MyContext } from '../../MyContext'
import { declineOffer,useMyUpcomingSession } from '../../api/helpApi';
import './AcceptedRequests.css'

function UpcomingSessions() {
    const {setUpcomingSessions} = useContext(MyContext);
    const {upcomingSessions} = useMyUpcomingSession();

    useEffect(()=>{
        setUpcomingSessions(upcomingSessions);
        // console.log(upcomingSessions)
    },[upcomingSessions])
  return (
    <div className="offers_wrapper_container">
        {upcomingSessions.length === 0 && <h2 style={{marginTop: '30%'}}>Upcoming Sessions Not Found!</h2>}
        {upcomingSessions.length > 0 && <>
        <p style={{ fontSize: "1.3rem", fontWeight: "600" }}>Upcoming Sessions</p>
        <div className="accepted_container">
          {upcomingSessions?.map((request) => (
            <div key={request._id} className="accepted_card_conatainer">
              <div className="helper_profile">
                <img src={request?.helperId?.profilePicture} alt="" />
                <p style={{ fontWeight: "600" }}>{request?.helperId?.name}</p>
                <button>View Profile</button>
              </div>
              <div className="requests_details">
                <p style={{ fontSize: "20px" }}>
                  <span style={{ fontWeight: "600" }}>Title:</span>{" "}
                  <span style={{ fontWeight: "500" }}>{request.title}</span>
                </p>
                <p style={{ fontSize: "14px" }}>
                  <span style={{ fontWeight: "600" }}>Description:</span>{" "}
                  {request.description}
                </p>
                <p>
                  <span style={{ fontStyle: "italic" }}>Schedule Date:</span>{" "}
                  <span style={{ fontWeight: "600" }}>
                    {request.scheduledTime.Date}
                  </span>
                </p>
                <p>
                  <span style={{ fontStyle: "italic" }}>Schedule Time:</span>{" "}
                  <span style={{ fontWeight: "600" }}>
                    {request.scheduledTime.Time}
                  </span>
                </p>
                <div className="action_buttons">
                  <button style={{ background: "#6c757d", color: "#fff" }}>
                    Chat
                  </button>
                  <button style={{ background: "blue", color: "#fff" }}>
                    Join
                  </button>
                  <button onClick={()=> declineOffer(request._id)} style={{ background: "red", color: "#fff" }}>
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>}
      </div>
  )
}

export default UpcomingSessions