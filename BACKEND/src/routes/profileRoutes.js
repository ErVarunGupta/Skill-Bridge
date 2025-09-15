import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import { deleteProfile, getAllUserProfile, getMyProfile, updateProfile, updateRating } from "../controllers/profileController.js";

const router = Router();


router.put("/update_profile", authValidation,updateProfile )
router.get("/all_user_profile", authValidation, getAllUserProfile)
router.get("/my_profile/:id", authValidation, getMyProfile)
router.delete("/delete_profile", authValidation, deleteProfile)
router.put("/update_ratings", authValidation, updateRating)

export default router;