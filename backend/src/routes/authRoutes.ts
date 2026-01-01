import express from "express"
import { getMe, login, logout, register } from "../controllers/authController.js"
import { protect } from "../middleware/authMidlleware.js";

const router = express.Router()

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", protect, getMe);



export default router;