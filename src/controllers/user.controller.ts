import { Request, Response } from "express";
import {
  createUSer,
  deleteUser,
  login,
  retrieveUser,
  retrieveUsers,
  updateUser,
} from "../service/user.service";
import { ILogin, IUser } from "../../type";
import { generateToken } from "../helpers/jwt";

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

export const updateUserDetails = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData: IUser = req.body;
  try {
    const user = await retrieveUser(userId);
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User Not Found",
      });
    } else {
      const response = await updateUser(user.id, userData);
      if (response) {
        res.status(200).json({
          message: "User details updated sucessfully 😀!",
          data: response,
        });
      } else {
        res.status(400).json({
          message: "Failed to update user details!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const response = await retrieveUser(userId);
    if (!response) {
      res.status(404).json({
        status: 404,
        message: "User Not Found",
      });
    } else {
      await deleteUser(userId);
      res.status(200).json({
        message: "User deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const loginData: ILogin = req.body;
  try {
    const response: any = await login(loginData);
    if (!response) {
      res.status(401).json({
        status: 401,
        message: "Invalid credentials!",
      });
    } else if (response === false) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      const accessToken = await generateToken(response);
      res.status(200).json({
        message: "Welcome😊!",
        accessToken,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
