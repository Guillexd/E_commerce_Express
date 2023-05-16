import { productModel } from "../../mongoDB/models/product.model.js";

export default class ProductManager {
  async getProducts(queryFilter, options) {
    const products = await productModel.paginate(queryFilter, options);
    return products;
  }

  async getProductById(idProduct) {
    const product = await productModel.findById(idProduct);
    return product;
  }

  async addProduct(propsNewProduct) {
    try {
      const newProduct = await productModel.create(propsNewProduct);
      return newProduct;
    } catch (err) {
      return err;
    }
  }

  async updateProductById(idProduct, propsProduct) {
    const productChanged = await productModel.findByIdAndUpdate(
      idProduct,
      propsProduct,
      { new: true }
    );
    return productChanged;
  }

  async deleteProductById(idProduct) {
    try {
      const productDeleted = await productModel.findByIdAndDelete(idProduct);
      return productDeleted;
    } catch (err) {
      return err;
    }
  }
}
