import { Request, Response } from "express";

import {
  approveShop,
  deleteShop,
  getShops,
  getSingleShop,
  registerNewShop,
  updateShop,
} from "../service/shop.service";
import { IShop } from "../../type";

export const registerAShop = async (req: Request, res: Response) => {
  const shopDetails: IShop = req.body;
  try {
    const response = await registerNewShop(shopDetails);
    res.status(201).json({
      message:
        "You have successfully requested to register shop, you will receive a confirmation message on your email",
      shop: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchShops = async (req: Request, res: Response) => {
  try {
    const response = await getShops();
    res.status(200).json({
      message: "Shops retrieved successfully",
      shops: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchSingleShop = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await getSingleShop(id);
    res.status(200).json({
      message: "A shop retrieved successfully",
      shop: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateShopDetails = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateShopData: IShop = req.body;
  try {
    const shop = await getSingleShop(id);
    if (!shop) {
      res.status(404).json({
        status: 404,
        message: "Shop not found.",
      });
    } else {
      const response = await updateShop(id, updateShopData);
      if (response) {
        res.status(200).json({
          message: "Products details updated successfully",
          shop: response,
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

export const removeSingleShop = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const shop = await getSingleShop(id);
    if (!shop) {
      res.status(404).json({
        status: 404,
        message: "Shop not found.",
      });
    } else {
      const response = await deleteShop(id);
      res.status(200).json({
        message: "A shop deleted successfully",
        shop: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const shopApproval = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await approveShop(id);
    res.status(200).json({
      message: "Shop approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
