import { Router, Request, Response } from "express";
import userRoutes from "./user.routes";

const appRoutes = Router();
appRoutes.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to village deals api",
  });
});

appRoutes.use("/users", userRoutes);

export default appRoutes;
