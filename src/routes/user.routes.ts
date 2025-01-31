import { Router } from "express";
import {
  getSingleUser,
  getUsers,
  removeUser,
  updateUserDetails,
  userLogin,
  userRegister,
} from "../controllers/user.controller";
import {
  loginSchema,
  updateUserSechama,
  userRegisterSchema,
} from "../schema/user.schema";
import { validateSchema } from "../middleware/validator";
import { isAdmin, isAdminOrManagerOrSeller } from "../middleware/checkRole";
import { isLoggedIn } from "../middleware/login.middleware";

const userRoutes = Router();

userRoutes.post("/register", validateSchema(userRegisterSchema), userRegister);
userRoutes.get("/", isLoggedIn, isAdminOrManagerOrSeller, getUsers);
userRoutes.get("/:id", isAdminOrManagerOrSeller, getSingleUser);
userRoutes.patch(
  "/:id",
  isLoggedIn,
  validateSchema(updateUserSechama),
  updateUserDetails,
);
userRoutes.delete("/:id", isLoggedIn, isAdmin, removeUser);
userRoutes.post("/login", validateSchema(loginSchema), userLogin);

export default userRoutes;
