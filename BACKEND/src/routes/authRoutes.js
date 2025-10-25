import { Router } from "express";
import { getUserProfile, getUsersProfile, Login, Register, updateUserProfile, uploadProfilePicture } from "../controllers/authController.js";
import { authValidation } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";
const router = Router();


router.post("/upload_profile_picture", authValidation, upload.single("image"), uploadProfilePicture)


router.post("/register", Register)
router.post("/login", Login)
router.get("/user", authValidation, getUserProfile);
router.get("/users", authValidation, getUsersProfile);
router.put("/user_update", authValidation, updateUserProfile);


export default router;