import express from "express"
import { getAllUsers, getMe, login, logout, register } from "../controllers/authController.js"
import { authorize, protect } from "../middleware/authMidlleware.js";

const router = express.Router()

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.get("/", protect, authorize('admin'), getAllUsers)



export default router;