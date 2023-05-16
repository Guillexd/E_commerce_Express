import { cartModel } from "../../mongoDB/models/cart.model.js";

export default class CartManager {
  async getCartById(idCart) {
    //method populate must have 3 parameters (path in DB(like an object), an element(optional), reference of another model or collection's name in DB)
    // const cart = await cartModel.findById(idCart);
    // const newCart = await cart.populate("products._id", null, "Products")
    //this commented code below is another way to do populate method
    const cart = await cartModel.findById(idCart);
    const newCart = await cart.populate({
      path: 'products._id',
      model: 'Products'
    });
    // console.log(cart.populated("products._id"));
    // console.log(newCart.products);
    return newCart;
  }

  async addCart(user) {
    const cart = await cartModel.findOne({ user });
    if (!cart) {
      const newCart = await cartModel.create({ user });
      return newCart;
    }
    return cart;
  }

  async addProductToCart(idCart, idProduct, quantity) {
    const cart = await cartModel.findById(idCart);
    //this for, try to find an id equals to idProduct, is it's true throw an error, if not, we will try to add a quantity
    //just with for 'return' works,
    for (let index = 0; index < cart.products.length; index++) {
      // console.log(cart.products[index]);
      //this '==' is for a right comparison since a new IdObjetc isn't strictly equal to a stringId
      if (cart.products[index]._id == idProduct) {
        if (!quantity) return;
        else {
          cart.products[index].quantity = quantity;
          cart.save();
          return cart;
        }
      }
    }

    //this if is to prove that quantity isn't alone in req.body
    if (idCart && idProduct) {
      if (quantity) {
        cart.products.push({_id: idProduct, quantity});
      } else {
        cart.products.push({_id: idProduct});
      }
      cart.save();
    }
    return cart;
  }

  async emptyCartById(idCart) {
    const cart = await cartModel.findByIdAndUpdate(
      idCart,
      { products: [] },
      { new: true }
    );
    return cart;
  }

  async deleteProductById(idCart, idProduct) {
    //the second parametes of findByIdAndUpdate could be an operator from mongo ($pull: this  operator removes from an existing array all instances of a value or values that match a specified condition)
    const cart = await cartModel.findByIdAndUpdate(
      idCart,
      { $pull: { products: { _id: idProduct } } },
      { new: true }
    );
    return cart;
  }
}
