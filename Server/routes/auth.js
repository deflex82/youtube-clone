import express from "express"
import { googleAuth, signin, signup } from "../controllers/auth.js";
const router= express.Router();

//create a user
//sign In
//google authentication
router.post("/signup",signup)
router.post("/signIn",signin)
router.post("/google",googleAuth)

export default router;