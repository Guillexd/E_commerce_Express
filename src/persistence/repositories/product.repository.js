import { productsResponse } from "../dtos/product.dtos.js";

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(queryFilter, options) {
    const products = await this.dao.getProducts(queryFilter, options);
    const objProducts = productsResponse(products);
    return objProducts;
  }

  async getProductById(id) {
    const product = await this.dao.getProductById(id);
    return product;
  }

  async addProduct(props) {
    const product= await this.dao.addProduct(props);
    return product;
  }

  async updateProductById(idProduct, objProduct) {
    const product = await this.dao.updateProductById(idProduct, objProduct);
    return product;
  }

  async deleteProductById(id) {
    const product = await this.dao.deleteProductById(id);
    return product;
  }
}
