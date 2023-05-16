import nodemailer from "nodemailer";
import obj from "../config.js"

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: obj.email_user,
        pass: obj.email_pass
    }
})