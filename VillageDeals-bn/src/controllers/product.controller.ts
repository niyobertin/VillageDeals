import { Request, Response } from "express";
import { IProduct } from "../../type";
import {
  createProducts,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../service/product.service";
import { uploadImage } from "../utils/cloudinary";

export const addNewProduct = async (req: Request, res: Response) => {
  const newProduct: IProduct = req.body;
  const productsImage = req.file;
  //@ts-ignore
  const { id } = req.user;

  let image = null;
  if (productsImage) {
    image = await uploadImage(productsImage);
  }
  try {
    const response = await createProducts(newProduct, image, id);
    res.status(201).json({
      message: "New product added😀!",
      data: response,
    });
  } catch (error) {
    if (error.message === "products already exists") {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

export const getAllproducts = async (req: Request, res: Response) => {
  try {
    const response = await getProducts();
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const product = await getSingleProduct(productId);
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Product not found.",
      });
    } else {
      res.status(200).json({
        message: "Product fetched successfully",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const updateProductDetails = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const updateProductData: IProduct = req.body;
  const productsImage = req.file;

  let image = null;
  if (productsImage) {
    image = await uploadImage(productsImage);
  }
  try {
    const product = await getSingleProduct(productId);
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Product not found.",
      });
    } else {
      const response = await updateProduct(
        product.id,
        updateProductData,
        image
      );
      if (response) {
        res.status(200).json({
          message: "Product updated successfully 😀!",
          data: response,
        });
      } else {
        res.status(400).json({
          message: "Failed to update  details!",
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

export const removeProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const product = await getSingleProduct(productId);
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Product not found.",
      });
    } else {
      await deleteProduct(product.id);
      res.status(200).json({
        message: "Product removed successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
