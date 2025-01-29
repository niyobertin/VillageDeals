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

