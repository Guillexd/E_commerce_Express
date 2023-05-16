import { transporter } from "../messages/nodemailer.js";
import logger from "../utils/winston.js";
import { generateToken } from "../utils/utils.js";

export async function sendEmail(req, res){
    const { email, subject, text } = req.body;
    try {
        await transporter.sendMail({
            from: req.user.email,
            to: [email],
            subject: subject,
            html: '<h1>Bienvenido<h1>',
            text: text
        })
        res.render("nodemailer", { title: "Send email"});
    } catch (error) {
        logger.error(error)
        res.json({ status: 0, error: error.message });
    }
}

export async function generateTokenAndSendEmailToChangePassword(req, res) {
    const { email } = req.body;
    const token = generateToken(email);
    try {
        await transporter.sendMail({
            from: "Admin",
            to: [email],
            subject: "Change your password",
            html: '<h2>Hey there, you must press the button below to change your password</h2> <br> <a style="background-color: #008CBA; border-radius: 10px; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" href="http://localhost:8080/view/change-password" target="_blank">Change password</a>',
        })
        res.cookie('tokenJwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60}).send("Email sent");
    } catch (error) {
        logger.error(error)
        res.json({ status: 0, error: error.message });
    }
}