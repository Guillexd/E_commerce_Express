import { cartDao } from "../persistence/daos/factory.js";

export async function getCartById(id) {
  const cart = await cartDao.getCartBtyId(id);
  return cart;
}

export async function addCart(propsNewCart) {
  const cart = await cartDao.addCart(propsNewCart);
  return cart;
}

export async function addProductToCart(idCart, idProduct, quantity) {
  const cart = await cartDao.addProductToCart(idCart, idProduct, quantity);
  return cart;
}

export async function emptyCartById(id) {
  const cart = await cartDao.emptyCartById(id);
  return cart;
}

export async function deleteProductById(idCart, idProduct) {
  const cart = await cartDao.deleteProductById(idCart, idProduct);
  return cart;
}
