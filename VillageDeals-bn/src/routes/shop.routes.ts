import { Router } from "express";
import {
  fetchShops,
  fetchSingleShop,
  registerAShop,
  removeSingleShop,
  updateShopDetails,
} from "../controllers/shop.controller";
import { validateSchema } from "../middleware/validator";
import { registerShopSchema, updateShopSchema } from "../schema/shopschema";
import { isLoggedIn } from "../middleware/login.middleware";
import {
  isAdminOrManager,
  isAdminOrManagerOrSeller,
} from "../middleware/checkRole";

const shopRoute = Router();

shopRoute.post("/", validateSchema(registerShopSchema), registerAShop);
shopRoute.get("/", fetchShops);
shopRoute.get("/:id", fetchSingleShop);
shopRoute.patch(
  "/:id",
  isLoggedIn,
  isAdminOrManagerOrSeller,
  validateSchema(updateShopSchema),
  updateShopDetails
);
shopRoute.delete("/:id", isLoggedIn, isAdminOrManager, removeSingleShop);
export default shopRoute;
