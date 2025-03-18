import { prisma } from "../utils/prisma.services";
import { IShop } from "../../type";

export const registerNewShop = async (data: IShop) => {
  try {
    const existingShop = await prisma.shop.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (existingShop) throw new Error(`A shop ${data.name} already exists.`);

    const newShop = await prisma.shop.create({
      data: {
        name: data.name,
        description: data.description,
        avatar: data.avatar,
        email: data.email,
        phone: data.phone,
        address: data.address,
        isActive: data.isActive,
      },
    });
    return newShop;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getShops = async () => {
  try {
    const shops = await prisma.shop.findMany({});
    return shops;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSingleShop = async (id: string) => {
  try {
    const shop = await prisma.shop.findUnique({
      where: { id },
    });
    return shop;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateShop = async (id: string, data: IShop) => {
  try {
    const updatedShop = await prisma.shop.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        avatar: data.avatar,
        email: data.email,
        phone: data.phone,
        address: data.address,
        isActive: data.isActive,
      },
    });
    return updatedShop;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteShop = async (id: string) => {
  try {
    await prisma.shop.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
