export interface IUser {
  id: string;
  firstName: string;
  secondName: string;
  profileImage?: string;
  email?: string;
  gender: string;
  dob: Date;
  phoneNumber: string;
  role: string;
  password: string;
  companyId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface ILogin {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface IProductCategory {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  products: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  price: number;
  discount?: number;
  inStock: number;
  sold: number;
  status: boolean;
  userId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  category: IProductCategory;
}
