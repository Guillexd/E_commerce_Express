import { Router } from "express";
import {
  getAllProducts,
  getOneProductById,
  addOneProduct,
  updateOneProductById,
  deleteOneProductById,
  mockingProducts
} from "../controller/product.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.get("/mockingproducts", mockingProducts);

router.get("/", getAllProducts);

router.get("/:idProduct", getOneProductById);

router.post("/add-product", upload.single("thumbnail"), addOneProduct);

router.put("/:idProduct", upload.single("thumbnail"), updateOneProductById);

router.delete("/:idProduct", deleteOneProductById);

export default router;
