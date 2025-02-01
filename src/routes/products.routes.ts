import { Router } from "express";
import {
  addNewProductCategory,
  productsCategories,
  removeProductCategory,
  updateProductCategoryDetails,
} from "../controllers/productCategory.controller";
import { isLoggedIn } from "../middleware/login.middleware";
import { isAdminOrManager } from "../middleware/checkRole";

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

export default productRoutes;
