import { prisma } from "../utils/prisma.services";
import type { IProduct } from "../../type";

export const createProducts = async (
  data: IProduct,
  imageFile: string,
  userId: string
) => {
  const existingCategory = await prisma.productCategory.findUnique({
    where: { id: data.categoryId },
  });

  if (!existingCategory) {
    throw new Error(`Category does not exist`);
  }

  const existingProducts = await prisma.product.findFirst({
    where: {
      name: {
        equals: data.name,
        mode: "insensitive",
      },
    },
  });
  if (existingProducts) throw new Error(`products already exists`);
  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      image: imageFile,
      description: data.description,
      categoryId: data.categoryId,
      price: data.price,
      discount: data.discount,
      inStock: data.inStock,
      sold: data.sold,
      status: data.status,
      userId: userId,
    },
  });
  return newProduct;
};

export const getProducts = async (): Promise<IProduct[] | null> => {
  try {
    const product = await prisma.product.findMany();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getSingleProduct = async (id: string): Promise<IProduct> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (
  id: string,
  data: IProduct,
  imageFile: string
): Promise<IProduct | null> => {
  try {
    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        image: imageFile,
        description: data.description,
        categoryId: data.categoryId,
        price: data.price,
        discount: data.discount,
        inStock: data.inStock,
        sold: data.sold,
        status: data.status,
      },
    });
    return updateProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await prisma.product.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error(`Error occurred during deleting ${error.message}`);
  }
};
