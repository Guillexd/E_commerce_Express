import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  des: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    default: null
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  owner: {
    type: String,
    default: "admin"
  }
})

//from install mongoose-paginate-v2
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model('Products', productSchema);