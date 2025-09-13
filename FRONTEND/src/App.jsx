import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./layouts/LandingPage";
import { MyContext } from "./MyContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useState } from "react";
import AcceptedRequests from "./pages/Dashboard/AcceptedRequests";
import AcceptedOffers from "./pages/Dashboard/AcceptedOffers";
import HelpForm from "./pages/Dashboard/HelpForm";
import UpcomingSessions from "./pages/Dashboard/UpcomingSessions";

function App() {
  const [showRequestCard, setShowRequestCard] = useState(false);
  const [showOfferCard, setShowOfferCard] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [myRequest, setMyRequest] = useState(null);
  const [myOffer, setMyOffer] = useState(null);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const providerValues = {
    showRequestCard,
    setShowRequestCard,
    showOfferCard, setShowOfferCard,
    userProfile,
    setUserProfile,
    pendingRequests,
    setPendingRequests,
    pendingRequest,
    setPendingRequest,
    myRequests,
    setMyRequests,
    myRequest,
    setMyRequest,
    myOffer, setMyOffer,
    title,
    setTitle,
    description,
    setDescription,
    acceptedRequests, setAcceptedRequests,
    acceptedOffers, setAcceptedOffers,
    upcomingSessions, setUpcomingSessions
  };

  return (
    <>
      <MyContext.Provider value={providerValues}>
        <Routes>
          <Route path={"/"} element={<LandingPage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/dashboard"} element={<Dashboard />}>
            <Route path="" element={<HelpForm />} />
            <Route path="upcoming_sessions" element = {<UpcomingSessions/>}/>
            <Route path="accepted_requests" element={<AcceptedRequests />} />
            <Route path="accepted_offers" element={<AcceptedOffers />} />
          </Route>
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;
