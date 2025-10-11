// AcceptedComponents.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import {
  declineOffer,
  handleAckAccept,
  useMyAcceptedOffers,
  useMyAcceptedReqeusts,
  useCompletedRequests,
  useMyUpcomingSession,
} from "../../api/helpApi";
import "./AcceptedComponents.css";
import { jwtDecode } from "jwt-decode";

// ==================== Accepted Offers ====================
export function AcceptedOffers() {
  const navigate = useNavigate();
  const { setAcceptedOffers } = useContext(MyContext);
  const { acceptedOffers, loading } = useMyAcceptedOffers();

  useEffect(() => {
    setAcceptedOffers(acceptedOffers);
  }, [acceptedOffers]);

  return (
    <AcceptedWrapper
      loading={loading}
      data={acceptedOffers}
      emptyText="Accepted Offers Not Found!"
      title="Accepted Offers"
      userKey="userId"
      showAckButtons={false}
      navigate={navigate}
    />
  );
}

// ==================== Accepted Requests ====================
export function AcceptedRequests() {
  const navigate = useNavigate();
  const { setAcceptedRequests } = useContext(MyContext);
  const { acceptedRequests, loading } = useMyAcceptedReqeusts();

  useEffect(() => {
    setAcceptedRequests(acceptedRequests);
  }, [acceptedRequests]);

  return (
    <AcceptedWrapper
      loading={loading}
      data={acceptedRequests}
      emptyText="Accepted Requests Not Found!"
      title="Accepted Requests"
      userKey="helperId"
      showAckButtons={true}
      navigate={navigate}
    />
  );
}

// ==================== Completed Requests ====================
export function CompletedRequests() {
  const navigate = useNavigate();
  const { completedRequests, loading } = useCompletedRequests();
  const userId = jwtDecode(localStorage.getItem("token")).id;

  // Map userId to show correct profile
  const data = completedRequests.map((req) => {
    const isOwner = req.userId._id === userId;
    return {
      ...req,
      displayUser: isOwner ? req.helperId : req.userId,
    };
  });

  return (
    <AcceptedWrapper
      loading={loading}
      data={data}
      emptyText="Completed Requests Not Found!"
      title="Completed Requests"
      userKey="displayUser"
      showAckButtons={false}
      navigate={navigate}
      completed={true}
    />
  );
}

// ==================== Upcoming Sessions ====================
export function UpcomingSessions() {
  const navigate = useNavigate();
  const { upcomingSessions, loading } = useMyUpcomingSession();
  const userId = jwtDecode(localStorage.getItem("token")).id;

  const data = upcomingSessions.map((req) => {
    const isOwner = req.userId._id === userId;
    return {
      ...req,
      displayUser: isOwner ? req.helperId : req.userId,
    };
  });

  return (
    <AcceptedWrapper
      loading={loading}
      data={data}
      emptyText="Upcoming Sessions Not Found!"
      title="Upcoming Sessions"
      userKey="displayUser"
      showAckButtons={false}
      navigate={navigate}
      joinVideoCall={true}
    />
  );
}

// ==================== Generic Wrapper Component ====================
function AcceptedWrapper({
  loading,
  data,
  emptyText,
  title,
  userKey,
  showAckButtons,
  navigate,
  completed = false,
  joinVideoCall = false,
}) {
  if (loading) return <div className="loading">Loading...</div>;
  if (!data || data.length === 0)
    return <h2 style={{ marginTop: "30%", textAlign:'center' }}>{emptyText}</h2>;

  return (
    <div className="offers_wrapper_container">
      <p className="wrapper_title">{title}</p>
      <div className="accepted_container">
        {data.map((request) => (
          <div key={request._id} className="accepted_card_conatainer">
            <div className="helper_profile">
              <img src={request[userKey]?.profilePicture} alt={request[userKey]?.name} />
              <div>
                <p>{request[userKey]?.name}</p>
                <p className="username">@{request[userKey]?.username}</p>
              </div>
              <button onClick={() => navigate(`/show_profile/${request[userKey]?._id}`)}>
                View Profile
              </button>
            </div>

            <div className="requests_details">
              <p>
                <span className="label">Title:</span>{" "}
                <span className="value">{request.title}</span>
              </p>
              <p>
                <span className="label">Description:</span>{" "}
                <span className="value">{request.description}</span>
              </p>
              <p>
                <span className="label">Schedule Date:</span>{" "}
                <span className="value">{request.scheduledTime.Date}</span>
              </p>
              <p>
                <span className="label">Schedule Time:</span>{" "}
                <span className="value">{request.scheduledTime.Time}</span>
              </p>
              {completed && (
                <p style={{color:"#000", fontWeight: 600}}>
                  Status: <span className="completed_status">Completed</span>
                </p>
              )}

              <div className="action_buttons">
                <button onClick={() => navigate(`/user/chat/${request._id}`)}>
                  Chat
                </button>

                {joinVideoCall && (
                  <button
                    style={{ background: "blue", color: "#fff" }}
                    onClick={() => navigate(`/user/video_call/${request._id}`)}
                  >
                    Join
                  </button>
                )}

                {showAckButtons && (
                  <>
                    <button
                      onClick={() => handleAckAccept(request._id, "accepted")}
                      className="accept_btn"
                    >
                      AckAccept
                    </button>
                    <button
                      onClick={() => handleAckAccept(request._id, "waiting")}
                      className="decline_btn"
                    >
                      AckDecline
                    </button>
                  </>
                )}

                {!showAckButtons && !completed && !joinVideoCall && (
                  <button
                    onClick={() => declineOffer(request._id)}
                    className="decline_btn"
                  >
                    Decline
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
