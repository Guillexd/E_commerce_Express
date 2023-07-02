import { Router } from "express";
import {
  getOneUserByEmail,
  putCookieAndRedirect,
  addOneUser,
  changeOnePassword,
  logoutUser,
  changeRole,
  getAllUsers,
} from "../controller/user.controller.js";
import { generateTokenAndSendEmailToChangePassword } from "../controller/email.controller.js";
import passport from "passport";

const router = Router();

router.get("/", getAllUsers);

//It must be POST to recive data from req.body
router.post("/login", getOneUserByEmail);

//passport-github githubLogin
router.get(
  "/login-github",
  passport.authenticate("githubLogin", { scope: ["user:email"] })
);
router.get(
  "/github-login",
  passport.authenticate("githubLogin", {
    failureRedirect: "/view/error-login",
    session: false,
  }),
  putCookieAndRedirect
);

//passport-github githubRegister
router.get(
  "/register-github",
  passport.authenticate("githubRegister", { scope: ["user:email"] })
);
router.get(
  "/github-register",
  passport.authenticate("githubRegister", {
    failureRedirect: "/view/error-register",
    session: false,
  }),
  putCookieAndRedirect
);

//passport-google googleLogin
router.get(
  "/login-google",
  passport.authenticate("googleLogin", { scope: ["email", "profile"] })
);
router.get(
  "/google-login",
  passport.authenticate("googleLogin", {
    failureRedirect: "/view/error-login",
    session: false,
  }),
  putCookieAndRedirect
);

//passport-google googleRegister
router.get(
  "/register-google",
  passport.authenticate("googleRegister", { scope: ["email", "profile"] })
);
router.get(
  "/google-register",
  passport.authenticate("googleRegister", {
    failureRedirect: "/view/error-register",
    session: false,
  }),
  putCookieAndRedirect
);

router.post("/register", addOneUser);

router.post("/ask-change-password", generateTokenAndSendEmailToChangePassword);

router.post(
  "/change-password",
  passport.authenticate("current", {
    session: false,
  }),
  changeOnePassword
);

router.get("/premiun/:uid", changeRole);

router.get("/logout", logoutUser);

export default router;
