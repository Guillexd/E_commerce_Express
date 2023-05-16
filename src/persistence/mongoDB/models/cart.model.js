import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  },
  user:{
    type: String,
    required: true
  },
  products: [
    {
      product: {
        //It's a bit weird that product doesn't appear in mongo atlas by its name, instead of that it's _id, and just with this works
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
})

export const cartModel = mongoose.model('Carts', cartSchema);
