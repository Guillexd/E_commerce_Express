import { Router } from "express";
import {
  getOneCartById,
  addOneCart,
  addOneProductToCart,
  emptyOneCartById,
  deleteOneProductById,
  createTicket,
  showTicket
} from "../controller/cart.controller.js";

const router = Router();

router.get("/:idCart", getOneCartById);

router.post("/add-cart", addOneCart);

router.put("/:idCart", addOneProductToCart);

router.delete("/:idCart", emptyOneCartById);

router.delete("/:idCart/products/:idProduct", deleteOneProductById);

router.get("/purchase/:tId/:cId", showTicket);

router.post("/:cId/purchase", createTicket);


export default router;
