import express from "express";
//env
import obj from "./config.js";
//Routes imports
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.router.js";
import viewRouter from "./routes/view.router.js";
import emailRouter from "./routes/email.router.js";
//cookie parser
import cookieParser from "cookie-parser";
//Template engine
import exphbs from "express-handlebars";
import { __dirname } from "./utils/utils.js";
//solution to this: Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent. You can add a runtime option to disable the check or this warning: See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for detail
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";

import "./passport/passportStrategies.js";
import passport from "passport";
import { roleMiddleware } from "./middleware/rol.middleware.js";
import { generateLogger } from "./middleware/winston.middleware.js";
import logger from "./utils/winston.js";
import { errorMiddleware } from "./middleware/errors.middleware.js";

const server = express();

server.use(generateLogger);

//still solution
const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

//default settings to allow json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));

//Handlebars settings
server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

//cookie parser
server.use(cookieParser());

//Routes
server.get("/", (req, res) => res.redirect("/view/login"));
server.use("/view", viewRouter);
server.use("/user", userRouter);
server.use(
  "/api/products",
  passport.authenticate("current", {
    session: false,
    failureRedirect: "/view/error",
  }),
  roleMiddleware,
  productRouter
);
server.use(
  "/api/carts",
  passport.authenticate("current", {
    session: false,
    failureRedirect: "/view/error",
  }),
  roleMiddleware,
  cartRouter
);
server.use(
  "/api/email",
  passport.authenticate("current", {
    session: false,
    failureRedirect: "/view/error",
  }),
  emailRouter
);

server.get("/loggerTest", (req, res) => {
  logger.fatal("Log fatal");
  logger.error("Log Error");
  logger.warning("Log warn");
  logger.info("Log info");
  logger.http("Log http");
  logger.debug("Log debug");
  res.send("Log from winston");
});

//Endpoints
server.get("*", (req, res) => res.render("error404", {css: "error", js: "error"}));
server.post("*", (req, res) => res.render("error404", {css: "error", js: "error"}));
server.put("*", (req, res) => res.render("error404", {css: "error", js: "error"}));
server.delete("*", (req, res) => res.render("error404", {css: "error", js: "error"}));

server.use(errorMiddleware);

const PORT = obj.port;

server.listen(PORT, () => {
  console.log("Listening throught PORT:" + PORT);
});
