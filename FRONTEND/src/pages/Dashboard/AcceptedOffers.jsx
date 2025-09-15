import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../MyContext";
import { declineOffer,  useMyAcceptedOffers } from "../../api/helpApi";
import "./AcceptedRequests.css";

function AcceptedOffers() {
  const { setAcceptedOffers } = useContext(MyContext);
  const { acceptedOffers } = useMyAcceptedOffers();

  useEffect(() => {
    setAcceptedOffers(acceptedOffers);
    console.log(acceptedOffers[0]?.userId.profilePicture);
  }, [acceptedOffers]);

  return (
    <>
      <div className="offers_wrapper_container">
        {acceptedOffers.length === 0 && (
          <h2 style={{ marginTop: "30%" }}>Accepted Offers Not Found!</h2>
        )}
        {acceptedOffers.length > 0 && (
          <>
            <p style={{ fontSize: "1.3rem", fontWeight: "600" }}>
              Accepted Offers
            </p>
            <div className="accepted_container">
              {acceptedOffers?.map((request) => (
                <div key={request._id} className="accepted_card_conatainer">
                  <div className="helper_profile">
                    <img src={request?.userId?.profilePicture} alt="" />
                    <p style={{ fontWeight: "600" }}>{request?.userId?.name}</p>
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
                      <span style={{ fontStyle: "italic" }}>
                        Schedule Date:
                      </span>{" "}
                      <span style={{ fontWeight: "600" }}>
                        {request.scheduledTime.Date}
                      </span>
                    </p>
                    <p>
                      <span style={{ fontStyle: "italic" }}>
                        Schedule Time:
                      </span>{" "}
                      <span style={{ fontWeight: "600" }}>
                        {request.scheduledTime.Time}
                      </span>
                    </p>
                    <div className="action_buttons">
                      <button onClick={()=> declineOffer(request._id)} style={{ background: "red", color: "#fff" }}>
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AcceptedOffers;
