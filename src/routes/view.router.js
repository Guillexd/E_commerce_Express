import { Router } from "express";
import { productDao } from "../persistence/daos/factory.js";
import passport from "passport";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { css: "style", js: "home", title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { css: "style", js: "home", title: "Register" });
});

router.get("/ask-change-password", (req, res) => {
  res.render("askChangePassword", {
    css: "error",
    js: "error",
    title: "Change-password",
  });
});

router.get(
  "/change-password",
  passport.authenticate("current", {
    failureRedirect: "/view/ask-change-password",
    session: false,
  }),
  (req, res) => {
    res.render("changePassword", {
      css: "style",
      js: "home",
      title: "Change password",
    });
  }
);

router.get("/error-login", (req, res) => {
  res.render("errorLogin", {
    css: "style",
    js: "home",
    title: "Error in Login",
  });
});

router.get("/error-register", (req, res) => {
  res.render("errorRegister", {
    css: "style",
    js: "home",
    title: "Error in register",
  });
});

router.get("/add-product", (req, res) => {
  res.render("addProduct", { css: "style", js: "home", title: "Add product" });
});

router.get("/edit-product/:id", async (req, res) => {
  const product = await productDao.getProductById(req.params.id);
  res.render("editProduct", {
    css: "style",
    js: "home",
    title: "Edit product",
    product,
  });
});

router.get("/nodemailer", (req, res) => {
  res.render("nodemailer", { title: "Send email" });
});

export default router;
