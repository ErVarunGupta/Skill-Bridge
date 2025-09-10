import { Router } from "express";
import { Login, Register } from "../controllers/authController.js";
const router = Router();


router.get("/test", async(req, res)=>{
    res.send("this is testing route")
})

router.post("/register", Register)
router.post("/login", Login)


export default router;