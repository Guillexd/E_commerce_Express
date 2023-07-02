import {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../services/product.services.js";
import { generateProducts } from "../utils/mocks.js";
import CustomError from "../utils/errors.js";
import {
  ErrorName,
  ErrorMessage,
  ErrorCause,
} from "../utils/error.dictionary.js";
import logger from "../utils/winston.js";
import { transporter } from "../messages/nodemailer.js";

//Here you must validate data because you can use req and res instead of router itself

export async function getAllProducts(req, res) {
  const {
    page = 1,
    limit = 5,
    category = null,
    filter = null,
    inputFilter = null,
    sort,
  } = req.query;
  //options to paginate
  const filters = { page, limit, category, filter, inputFilter, sort };
  try {
    let products = await getProducts(filters);
    if (req.isAdmin || req.isPremiun) {
      const payload = products.payload.map((el) => {
        return { ...el._doc, isAllowed: true, isPremiun: req.isPremiun };
      });
      products = { ...products, payload };
    }
    res.render("home", {
      css: "style",
      js: "home",
      title: "Products",
      products,
      isAllowed: (req.isAdmin || req.isPremiun),
      isPremiun: req.isPremiun,
      user: req.user
    });
  } catch (err) {
    logger.error(err)
    res.render("error404");
  }
}

export async function getOneProductById(req, res) {
  const { idProduct } = req.params;
  try {
    const product = await getProductById(idProduct);
    res.render("product", {
      css: "style",
      js: "home",
      title: "Product",
      product,
      isntAllowed: (!req.isAdmin || req.isPremiun),
    });
  } catch (err) {
    logger.error(err)
    res.render("error404");
  }
}

export async function addOneProduct(req, res, next) {
  const { title, des, price, stock, category } = req.body;
  try {
    if (!(req.isAdmin || req.isPremiun)) {
      console.log(req.isAdmin, req.isPremiun);
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.isAllowed,
      });
    }
    if (!title || typeof title !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.title,
      });
    }
    if (!des || typeof des !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.description,
      });
    }
    if (!price || typeof parseInt(price) !== "number") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.price,
      });
    }
    if (!req.file || typeof req.file?.filename !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.thumbnail,
      });
    }
    if (!stock || typeof parseInt(stock) !== "number") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.stock,
      });
    }
    if (!category || typeof category !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.category,
      });
    }
    const newProduct = await addProduct({
      title,
      des,
      price,
      thumbnail: req.file.filename,
      stock,
      category,
      owner: req.user.rol == "admin" ? req.user.rol : req.user.email
    });
    res.json({ product: newProduct });
  } catch (err) {
    logger.error({
      name: err.name,
      message: err.message,
      cause: err.cause,
    })
    next(err)
  }
}

export async function updateOneProductById(req, res, next) {
  // console.log(req.body);
  const { idProduct } = req.params;
  const { title, des, price, stock, category } = req.body;
  try {
    if (!(req.isAdmin || req.isPremiun)) {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.isAllowed,
      });
    }
    if (!title || typeof title !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.title,
      });
    }
    if (!des || typeof des !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.description,
      });
    }
    if (!price || typeof parseInt(price) !== "number") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.price,
      });
    }
    if (req.file && typeof req.file?.filename !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.thumbnail,
      });
    }
    if (!stock || typeof parseInt(stock) !== "number") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.stock,
      });
    }
    if (!category || typeof category !== "string") {
      CustomError.createCustomError({
        name: ErrorName.PRODUCT_ERROR_POST,
        message: ErrorMessage.PRODUCT_ERROR_POST,
        cause: ErrorCause.category,
      });
    }

    const isFromPremiunUser = await getProductById(idProduct);
    if(isFromPremiunUser.owner !== req.user.email && req.user.rol !== "admin") {
      CustomError.createCustomError({
        name: ErrorName.NOT_PERMITION,
        message: ErrorMessage.NOT_PERMITION,
        cause: ErrorCause.not_permition,
      });
    }
    const obj = {
      title,
      des,
      price,
      stock,
      category,
    }
    if (req.file?.filename) {
      obj.thumbnail = req.file.filename;
    }
    const productEdited = await updateProductById(idProduct, obj);
    res.json({ product: productEdited });
  } catch (err) {
    logger.error({
      name: err.name,
      message: err.message,
      cause: err.cause,
    })
    next(err)
  }
}

export async function deleteOneProductById(req, res, next) {
  const { idProduct } = req.params;
  try {
    const isFromPremiunUser = await getProductById(idProduct);
    if(isFromPremiunUser.owner !== req.user.email && req.user.rol !== "admin") {
      CustomError.createCustomError({
        name: ErrorName.NOT_PERMITION,
        message: ErrorMessage.NOT_PERMITION,
        cause: ErrorCause.not_permition,
      });
    }
    if(isFromPremiunUser.owner == req.user.email && req.user.rol == "admin") {
      try {
          await transporter.sendMail({
              to: [req.user.email],
              subject: subject,
              html: '<h1>Warning<h1>',
              text: 'Your product was deleted'
          })
          res.json({ status: 1, message: 'Product deleted' });
      } catch (error) {
          logger.error(error)
          res.json({ status: 0, error: error.message });
      }
    }

    await deleteProductById(idProduct);
    res.json({ state: 1 });
  } catch (err) {
    logger.error({
      name: err.name,
      message: err.message,
      cause: err.cause,
    })
    next(err)
  }
}

export function mockingProducts(req, res) {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const product = generateProducts();
    product.count = i + 1;
    products.push(product);
  }
  res.render("home", {
    css: "style",
    js: "error",
    title: "Products",
    products,
    isAdmin: req.isAdmin,
    mocking: true,
  });
}
