import { Request, Response, NextFunction } from "express";
import { jwtDecode } from "jwt-decode";
import { prisma } from "../utils/prisma.services";
import { IUser } from "../../type";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined = undefined;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        status: 401,
        message:
          "Authentication token is missing. Please provide a valid token.",
      });
      return;
    }
    const decoded: any = await jwtDecode(token as string);
    const loggedUser: IUser = await prisma.user.findFirst({
      where: { email: decoded.email },
    });
    if (!loggedUser) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized access. Please log in to continue.",
      });
    } else {
      // @ts-ignore
      req.user = loggedUser;
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error: error.message,
    });
  }
};
