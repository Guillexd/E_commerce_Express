import { ticketDao } from "../persistence/daos/factory.js";
import { getCartById, deleteProductById } from "./cart.services.js";
import { getProductById, updateProductById } from "./product.services.js";
import { uid } from "uid";

export async function getTicketById(id) {
  const ticket = await ticketDao.getTicketById(id);
  return ticket;
}

export async function addTicket(cartId) {
  const { products, user } = await getCartById(cartId);
  const amountProducts = await Promise.all(
    products.map(async (el) => {
      let product = await getProductById(el._id._id);
      if (product) {
        if (el.quantity <= product.stock) {
          const stock = product.stock - el.quantity;
          await updateProductById(product._id, { stock });
          await deleteProductById(cartId, product._id);
          return { id: el._id._id, stock: el.quantity };
        } else undefined;
      } else undefined;
    })
  );
  const amount = amountProducts.filter((el) => el !== undefined);

  let totalAmount = 0;
  amount.forEach((el) => {
    totalAmount += el.stock;
  });

  const { _id } = await ticketDao.addTicket({
    code: uid(),
    amount: totalAmount,
    purchaser: user
  });
  return { products: amount, idTicket: _id };
}
