import { Request, Response, NextFunction } from "express";
import { isLoggedIn } from "./login.middleware";
import { prisma } from "../utils/prisma.services";
import { IUser } from "../../type";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await isLoggedIn(req, res, () => {});

    //@ts-ignore
    const { email, phoneNumber } = req.user;
    const user: IUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });
    if (user?.role === "ADMIN") {
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAdminOrManager = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await isLoggedIn(req, res, () => {});

    //@ts-ignore
    const { email, phoneNumber } = req.user;
    const user: IUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });
    if (user?.role === "ADMIN" || user?.role === "MANAGER") {
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAdminOrManagerOrSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await isLoggedIn(req, res, () => {});

    //@ts-ignore
    const { email, phoneNumber } = req.user;
    const user: IUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });
    if (
      user?.role === "ADMIN" ||
      user?.role === "MANAGER" ||
      user?.role === "SELLER"
    ) {
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
