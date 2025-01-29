import { Router } from "express";
import {
  getSingleUser,
  getUsers,
  userRegister,
} from "../controllers/user.controller";
import { userRegisterSchema } from "../schema/user.schema";
import { validateSchema } from "../middleware/validator";

const userRoutes = Router();

userRoutes.post("/register", validateSchema(userRegisterSchema), userRegister);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getSingleUser);

export default userRoutes;
