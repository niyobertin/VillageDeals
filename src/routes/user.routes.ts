import { Router } from "express";
import {
  getSingleUser,
  getUsers,
  removeUser,
  updateUserDetails,
  userRegister,
} from "../controllers/user.controller";
import { updateUserSechama, userRegisterSchema } from "../schema/user.schema";
import { validateSchema } from "../middleware/validator";

const userRoutes = Router();

userRoutes.post("/register", validateSchema(userRegisterSchema), userRegister);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getSingleUser);
userRoutes.patch("/:id", validateSchema(updateUserSechama), updateUserDetails);
userRoutes.delete("/:id", removeUser);

export default userRoutes;
