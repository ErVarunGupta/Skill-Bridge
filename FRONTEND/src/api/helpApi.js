import { useContext, useEffect } from "react";
import { MyContext } from "../MyContext";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

export const usePendingRequests = () => {
  const { pendingRequests, setPendingRequests } = useContext(MyContext);
  const fetchRequests = async () => {
    try {
      const url = `${API_URL}/get_all_pending_request`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      // console.log(result.requests);

      const { success, message } = result;
      if (success) {
        setPendingRequests(result.requests);
      }
    } catch (error) {
      console.log("Error during fetching pending requests: ", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { pendingRequests };
};

export const useMyRequests = () => {
  const { myRequests, setMyRequests } = useContext(MyContext);
  const fetchRequests = async () => {
    try {
      const url = `${API_URL}/get_my_requests`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      // console.log(result);

      const { success, message } = result;
      if (success) {
        setMyRequests(result.myRequests);
      }
    } catch (error) {
      console.log("Error during fetching pending requests: ", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { myRequests };
};

export const getMyAcceptedReqeusts = () => {
  const { acceptedRequests, setAcceptedRequests } = useContext(MyContext);
  const fetchRequests = async () => {
    try {
      const url = `${API_URL}/get_my_accepted_requests`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      // console.log(result);

      const { success, message } = result;
      if (success) {
        setAcceptedRequests(result.myRequests);
      }
    } catch (error) {
      console.log("Error during fetching accepted requests: ", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { acceptedRequests };
};

export const getMyAcceptedOffers = () => {
  const { acceptedOffers, setAcceptedOffers } = useContext(MyContext);
  const fetchOffers = async () => {
    try {
      const url = `${API_URL}/get_my_accepted_offers`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      // console.log(result);

      const { success, message } = result;
      if (success) {
        setAcceptedOffers(result.myOffers);
      }
    } catch (error) {
      console.log("Error during fetching accepted offers: ", error.message);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return { acceptedOffers };
};

export const getMyUpcomingSession = () => {
  const { upcomingSessions, setUpcomingSessions } = useContext(MyContext);
  const fetchSessions = async () => {
    try {
      const url = `${API_URL}/get_my_upcoming_session`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      // console.log(result);

      const { success, message } = result;
      if (success) {
        setUpcomingSessions(result.myOffers);
      }
    } catch (error) {
      console.log("Error during fetching upcoming sessions: ", error.message);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return { upcomingSessions };
};

export const acceptRequest = async (pendingRequestId) => {
  try {
    console.log(pendingRequestId);
    const url = `${API_URL}/accept_request/${pendingRequestId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        Date: "12-10-2025",
        Time: "9:12 pm",
      }),
    });

    const result = await response.json();
    console.log(result);

    const { success, message } = result;
    if (success) {
      alert("Offer Accepted!");
    } else {
      alert(message);
    }
  } catch (error) {
    console.log("Error during accepting request: ", error.message);
  }
};

export const declineOffer = async (requestId) => {
  try {
    console.log(requestId);
    const url = `${API_URL}/decline_request/${requestId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const result = await response.json();
    console.log(result);

    const { success, message } = result;
    if (success) {
      alert("Offer Rejected Successfully!");
    } else {
      alert(message);
    }
  } catch (error) {
    console.log("Error during decline offer : ", error.message);
  }
};

export const deleteRequest = async (requestId) => {
  try {
    const url = `${API_URL}/delete_request/${requestId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const result = await response.json();
    console.log(result);

    const { success, message } = result;
    alert(message);
  } catch (error) {
    console.log("Error during deleting request : ", error.message);
  }
};
