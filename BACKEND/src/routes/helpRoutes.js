import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import {
  acceptRequest,
  acknoledgeHelper,
  completeRequest,
  createHelpRequest,
  declineRequest,
  deleteRequest,
  getAcceptedOffers,
  getAcceptedRequests,
  getAllPendingRequests,
  getAllRequests,
  getMyRequests,
  getUpcomingSession,
} from "../controllers/helpController.js";

const router = Router();

router.post("/create_request", authValidation, createHelpRequest);
router.get("/get_all_requests", authValidation, getAllRequests);
router.get("/get_all_pending_request", authValidation, getAllPendingRequests);
router.get("/get_my_requests", authValidation, getMyRequests);
router.get("/get_my_accepted_requests", authValidation, getAcceptedRequests);
router.get("/get_my_accepted_offers", authValidation, getAcceptedOffers);
router.get("/get_my_upcoming_session", authValidation, getUpcomingSession);
router.delete("/delete_request/:requestId", authValidation, deleteRequest);
router.put("/accept_request/:requestId", authValidation, acceptRequest);
router.put("/decline_request/:requestId", authValidation, declineRequest);
router.put("/acknoledge_helper/:requestId", authValidation, acknoledgeHelper);
router.put("/complete_request/:requestId", authValidation, completeRequest);

export default router;
