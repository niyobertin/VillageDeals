import { Request, Response } from "express";
import {
  createUSer,
  retrieveUser,
  retrieveUsers,
} from "../service/user.service";
import { IUser } from "../../type";

export const userRegister = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  try {
    const response = await createUSer(userData);

    res.status(201).json({
      message: "Account created successfull !",
      data: response,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await retrieveUsers();
    res.status(200).json({
      message: "Users retrieved successfully!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const response = await retrieveUser(userId);
    if (!response) {
      res.status(404).json({
        status: 404,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        message: "User retrieved successfully!",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
