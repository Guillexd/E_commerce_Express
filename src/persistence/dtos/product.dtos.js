export const productsResponse = (products) => {
  //this default data is from paginate-mongooose
  const objProducts = {
    status: products.totalDocs ? 1 : 0,
    payload: products.docs,
    totalPages: products.totalPages,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevLink: products.hasPrevPage
      ? `page=${products.prevPage}`
      : null,
    nextLink: products.hasNextPage
      ? `page=${products.nextPage}`
      : null,
  };
  return objProducts;
};
