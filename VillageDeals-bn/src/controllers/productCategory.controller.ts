import { Request, Response } from "express";
import { IProductCategory } from "../../type";
import {
  createProductsCategory,
  deleteProductCategory,
  getProductsCategoies,
  getSingleProductCategory,
  updateProductCategory,
} from "../service/category.service";

export const addNewProductCategory = async (req: Request, res: Response) => {
  const newCategory: IProductCategory = req.body;
  try {
    const response = await createProductsCategory(newCategory);
    res.status(201).json({
      message: "New Category added😀!",
      data: response,
    });
  } catch (error) {
    if (error.message === "Category already exists") {
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

export const productsCategories = async (req: Request, res: Response) => {
  try {
    const response = await getProductsCategoies();
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

export const updateProductCategoryDetails = async (
  req: Request,
  res: Response,
) => {
  const categoryId = req.params.id;
  const updateCategory: IProductCategory = req.body;
  try {
    const category = await getSingleProductCategory(categoryId);
    if (!category) {
      res.status(404).json({
        status: 404,
        message: "Category not found.",
      });
    } else {
      const response = await updateProductCategory(category.id, updateCategory);
      if (response) {
        res.status(200).json({
          message: "Category updated successfully 😀!",
          data: response,
        });
      } else {
        res.status(400).json({
          message: "Failed to update category details!",
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

export const removeProductCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const category = await getSingleProductCategory(categoryId);
    if (!category) {
      res.status(404).json({
        status: 404,
        message: "Category not found.",
      });
    } else {
      await deleteProductCategory(category.id);
      res.status(200).json({
        message: "Category removed sucessfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
