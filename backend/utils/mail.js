import { Resend } from "resend"
import dotenv from "dotenv"
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendOtpMail = async (to, otp) => {
    await resend.emails.send({
        from: "Rasmalai <onboarding@resend.dev>", // free testing domain
        to,
        subject: "Reset Your Password",
        html: `<p>Your OTP for password reset is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    })
}

export const sendDeliveryOtpMail = async (user, otp) => {
    await resend.emails.send({
        from: "Rasmalai <onboarding@resend.dev>", // free testing domain
        to: user.email,
        subject: "Delivery OTP",
        html: `<p>Your OTP for delivery is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    })
}