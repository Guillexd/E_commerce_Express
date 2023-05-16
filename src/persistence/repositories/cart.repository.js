import { newCartDB } from "../dtos/cart.dtos.js";

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCartBtyId(id) {
    const cart = await this.dao.getCartById(id);
    return cart;
  }

  async addCart(propsNewCart) {
    const user = newCartDB(propsNewCart);
    const newCart = await this.dao.addCart(user);
    return newCart;
  }

  async addProductToCart(idCart, idProduct, quantity) {
    const cart = await this.dao.addProductToCart(idCart, idProduct, quantity);
    return cart;
  }

  async emptyCartById(id) {
    const cart = await this.dao.emptyCartById(id);
    return cart;
  }

  async deleteProductById(idCart, idProduct) {
    const cart = await this.dao.deleteProductById(idCart, idProduct);
    return cart;
  }
}
