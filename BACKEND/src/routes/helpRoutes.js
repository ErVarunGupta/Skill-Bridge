import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import {
  acceptRequest,
  acknowledgeHelper,
  completeRequest,
  createHelpRequest,
  declineRequest,
  deleteRequest,
  getAllPendingRequests,
  getAllRequests,
  getMyRequests,
} from "../controllers/helpController.js";

const router = Router();

router.post("/create_request", authValidation, createHelpRequest);
router.get("/get_all_requests", authValidation, getAllRequests);
router.get("/get_all_pending_request", authValidation, getAllPendingRequests);
router.get("/get_my_requests", authValidation, getMyRequests);
router.delete("/delete_request/:requestId", authValidation, deleteRequest);
router.put("/accept_request/:requestId", authValidation, acceptRequest);
router.put("/decline_request/:requestId", authValidation, declineRequest);
router.put("/acknoledge_helper/:requestId", authValidation, acknowledgeHelper);
router.put("/complete_request/:requestId", authValidation, completeRequest);

export default router;
