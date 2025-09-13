import { Router } from "express";
import { getUserProfile, Login, Register } from "../controllers/authController.js";
import { authValidation } from "../middlewares/authMiddleware.js";
const router = Router();


router.get("/test", async(req, res)=>{
    res.send("this is testing route")
})

router.post("/register", Register)
router.post("/login", Login)
router.get("/user", authValidation, getUserProfile);


export default router;