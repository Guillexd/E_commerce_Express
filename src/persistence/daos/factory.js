import config from "../../config.js";
import UserRepository from "../repositories/user.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import TicketRespository from "../repositories/ticket.repository.js";

let cartDao, productDao, userDao, ticketDao;
//MONGO + ' '
switch (config.persistence) {
  case "MONGO ":
    await import("../mongoDB/dbConfig.js");
    const { default: UserManager } = await import(
      "./mongoDAOs/user.manager.js"
    );
    userDao = new UserRepository(new UserManager());
    const { default: ProductManager } = await import(
      "./mongoDAOs/product.manager.js"
    );
    productDao = new ProductRepository(new ProductManager());
    const { default: CartManager } = await import(
      "./mongoDAOs/cart.manager.js"
    );
    cartDao = new CartRepository(new CartManager());
    const { default: TicketManager } = await import(
      "./mongoDAOs/ticket.manager.js"
    );
    ticketDao = new TicketRespository(new TicketManager());
    break;
  default:
    await import("../mongoDB/dbConfig.js");
    const { default: userManager } = await import(
      "./mongoDAOs/user.manager.js"
    );
    userDao = new UserRepository(new userManager());
    const { default: productManager } = await import(
      "./mongoDAOs/product.manager.js"
    );
    productDao = new ProductRepository(new productManager());
    const { default: cartManager } = await import(
      "./mongoDAOs/cart.manager.js"
    );
    cartDao = new CartRepository(new cartManager());
    const { default: ticketManager } = await import(
      "./mongoDAOs/ticket.manager.js"
    );
    ticketDao = new TicketRespository(new ticketManager());
    break;
}

export { cartDao, productDao, userDao, ticketDao };
