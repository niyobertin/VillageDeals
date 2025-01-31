import { prisma } from "../utils/prisma.services";
import { IUser, ILogin } from "../../type";
import { isPasswordMatch, hashPassword } from "../utils/hashPassword";

export const createUSer = async (data: IUser) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(data.password);
  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      secondName: data.secondName,
      profileImage: data.profileImage,
      email: data.email,
      gender: data.gender,
      dob: new Date(data.dob).toISOString(),
      phoneNumber: data.phoneNumber,
      role: data.role,
      password: hashedPassword,
      companyId: data.companyId,
      isActive: true,
    },
  });
  return newUser;
};

export const retrieveUsers = async (): Promise<IUser[] | null> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve users");
  }
};

export const retrieveUser = async (id: string): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user || null;
  } catch (error) {
    throw new Error(`Failed to retrieve user with ID ${id}`);
  }
};

export const updateUser = async (
  id: string,
  data: IUser,
): Promise<IUser | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        secondName: data.secondName,
        profileImage: data.profileImage,
        email: data.email,
        gender: data.gender,
        dob: data.dob ? new Date(data.dob).toISOString() : undefined,
        phoneNumber: data.phoneNumber,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user with ID ${id}`);
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
};

export const login = async (data: ILogin) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
      },
    });
    if (!user) {
      return null;
    } else {
      const isMatch = await isPasswordMatch(data.password, user?.password);
      if (isMatch) {
        return user;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw new Error("Error occured during login");
  }
};
