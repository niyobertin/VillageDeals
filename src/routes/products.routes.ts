import { Router } from "express";
import {
  addNewProductCategory,
  productsCategories,
  removeProductCategory,
  updateProductCategoryDetails,
} from "../controllers/productCategory.controller";
import { isLoggedIn } from "../middleware/login.middleware";
import {
  isAdminOrManager,
  isAdminOrManagerOrSeller,
} from "../middleware/checkRole";
import upload from "../middleware/multer.middleware";
import {
  addNewProduct,
  getAllproducts,
  getProduct,
  removeProduct,
  updateProductDetails,
} from "../controllers/product.controller";
import { validateSchema } from "../middleware/validator";
import { productSchema } from "../schema/productSchema";

const productRoutes = Router();
productRoutes.post(
  "/categories",
  isLoggedIn,
  isAdminOrManager,
  addNewProductCategory,
);
productRoutes.get("/categories", productsCategories);
productRoutes.patch(
  "/categories/:id",
  isLoggedIn,
  isAdminOrManager,
  updateProductCategoryDetails,
);
productRoutes.delete(
  "/categories/:id",
  isLoggedIn,
  isAdminOrManager,
  removeProductCategory,
);

// products
productRoutes.post(
  "/",
  isLoggedIn,
  isAdminOrManager,
  upload.single("image"),
  validateSchema(productSchema),
  addNewProduct,
);
productRoutes.get("/", isLoggedIn, isAdminOrManagerOrSeller, getAllproducts);
productRoutes.get("/:id", isLoggedIn, isAdminOrManagerOrSeller, getProduct);
productRoutes.patch(
  "/:id",
  isLoggedIn,
  isAdminOrManagerOrSeller,
  updateProductDetails,
);
productRoutes.delete(
  "/:id",
  isLoggedIn,
  isAdminOrManagerOrSeller,
  removeProduct,
);
export default productRoutes;
