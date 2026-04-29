import express from "express"
import { googleAuth, resetPassword, sendOtp, siqnIn, siqnOut, siqnUp, verifyOtp } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/siqnup",siqnUp)
authRouter.post("/siqnin",siqnIn)
authRouter.get("/siqnout",siqnOut)
authRouter.post("/send-otp",sendOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.post("/google-auth",googleAuth)

export default authRouter