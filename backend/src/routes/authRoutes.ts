import express from "express"
import { login, register } from "../controllers/authController.js"

const router = express.Router()

router.post("/auth/login", login);
router.post("/auth/signup", register);

export default router;