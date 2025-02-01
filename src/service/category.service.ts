import { prisma } from "../utils/prisma.services";
import type { IProductCategory } from "../../type";

export const createProductsCategory = async (data: IProductCategory) => {
  const existingCategoty = await prisma.productCategory.findFirst({
    where: {
      name: {
        equals: data.name,
        mode: "insensitive",
      },
    },
  });

  if (existingCategoty) throw new Error(`Category already exists`);
  const newProductCategory = await prisma.productCategory.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return newProductCategory;
};

export const getProductsCategoies = async (): Promise<
  IProductCategory[] | null
> => {
  try {
    const productCategories = await prisma.productCategory.findMany({
      include: { products: true },
    });
    return productCategories;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getSingleProductCategory = async (
  id: string,
): Promise<IProductCategory> => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductCategory = async (
  id: string,
  data: IProductCategory,
): Promise<IProductCategory | null> => {
  try {
    const existingCategory = await prisma.productCategory.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
        NOT: {
          id: id,
        },
      },
    });
    if (existingCategory) {
      throw new Error("Category with this name already exists.");
    }

    const updateProductCategory = await prisma.productCategory.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    return updateProductCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProductCategory = async (id: string): Promise<boolean> => {
  try {
    await prisma.productCategory.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error(`Error occured during deleting ${error.message}`);
  }
};
