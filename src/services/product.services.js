import { productDao } from "../persistence/daos/factory.js";

export async function getProducts({
  page,
  limit,
  category,
  filter,
  inputFilter,
  sort,
}) {
  let queryFilter = {};

  if (category) queryFilter.category = category;
  //SELECT * FROM inventory WHERE category = category AND item LIKE "inputFilter")
  if (filter && inputFilter)
    queryFilter[filter] = { $regex: inputFilter, $options: "i" };

  const options = { limit, page };
  if (sort == 1 || sort == -1) {
    options.sort = { price: sort };
  }
  const products = await productDao.getProducts(queryFilter, options);
  return products;
}

export async function getProductById(id) {
  const product = await productDao.getProductById(id);
  return product;
}

export async function addProduct(propsNewProduct) {
    const product = await productDao.addProduct(propsNewProduct);
    return product;
}

export async function updateProductById(idProduct, objProduct) {
    const product = await productDao.updateProductById(idProduct, objProduct);
    return product;
}

export async function deleteProductById(id) {
    const product = await productDao.deleteProductById(id);
    return product;
}