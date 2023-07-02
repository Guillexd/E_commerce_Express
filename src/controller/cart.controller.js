import {
  getCartById,
  addCart,
  addProductToCart,
  emptyCartById,
  deleteProductById,
} from "../services/cart.services.js";
import { getProductById } from "../services/product.services.js";
import { addTicket, getTicketById } from "../services/ticket.service.js";
import CustomError from "../utils/errors.js";
import {
  ErrorName,
  ErrorMessage,
  ErrorCause,
} from "../utils/error.dictionary.js";
import logger from "../utils/winston.js";

export async function getOneCartById(req, res) {
  const { idCart } = req.params;
  try {
    if (req.isAdmin) {
      CustomError.createCustomError({
        name: ErrorName.ADMIN_NOT_PERMITTED,
        message: ErrorMessage.ADMIN_NOT_PERMITTED,
        cause: ErrorCause.admin_not_permitted,
      });
    }
    const cart = await getCartById(idCart);
    res.render("cart", {
      css: "style",
      js: "home",
      title: "Cart",
      cart,
      isntAdmin: !req.isAdmin,
    });
  } catch (error) {
    res.render("error404");
  }
}

export async function addOneCart(req, res) {
  const { tokenJwt } = req.cookies;
  try {
    if (req.isAdmin) {
      CustomError.createCustomError({
        name: ErrorName.ADMIN_NOT_PERMITTED,
        message: ErrorMessage.ADMIN_NOT_PERMITTED,
        cause: ErrorCause.admin_not_permitted,
      });
    }
    const newCart = await addCart(tokenJwt);
    res.json({ cart: newCart });
  } catch (error) {
    res.json({ status: 0, error: error.message });
  }
}

export async function addOneProductToCart(req, res, next) {
  const { idCart } = req.params;
  const { idProduct, quantity } = req.body;
  try {
    if ((req.isAdmin)) {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.isAllowed,
      });
    }
    const product = await getProductById(idProduct);
    if(req.user?.email == product.owner) {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.isAllowed,
      });
    }
    const cart = await addProductToCart(idCart, idProduct, quantity);
    res.json({ cart });
  } catch (err) {
    logger.error({
      name: err.name,
      message: err.message,
      cause: err.cause,
    })
    next(err)
  }
}

export async function emptyOneCartById(req, res) {
  try {
  } catch (error) {
    res.json({ status: 0, error: error.message });
  }
}

export async function deleteOneProductById(req, res, next) {
  const { idCart, idProduct } = req.params;
  try {
    if (req.isAdmin) {
      CustomError.createCustomError({
        name: ErrorName.ADMIN_NOT_PERMITTED,
        message: ErrorMessage.ADMIN_NOT_PERMITTED,
        cause: ErrorCause.admin_not_permitted,
      });
    }
    const cart = await deleteProductById(idCart, idProduct);
    res.json({ cart });
  } catch (error) {
    logger.error({
      name: err.name,
      message: err.message,
      cause: err.cause,
    })
    next(error)
  }
}

export async function showTicket(req, res) {
  const { tId, cId } = req.params;
  try {
    if (req.isAdmin) throw new Error("You can't do this");
    const ticket = await getTicketById(tId);
    const { products } = await getCartById(cId);
    console.log(ticket);
    console.log(products);
    res.render("ticket", { css: "style", js: "home", ticket, products });
  } catch (error) {
    res.render("error404");
  }
}

export async function createTicket(req, res, next) {
  const { cId } = req.params;
  try {
    if (req.isAdmin) throw new Error("You can't do this");
    const ticket = await addTicket(cId);
    res.json({ ticket });
  } catch (error) {
    logger.error({
      name: err.name,
      message: err.message,
      cause: err.cause,
    })
    next(error)
  }
}
