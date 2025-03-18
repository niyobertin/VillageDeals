import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinary";
cloudinaryConfig;
export const uploadImage = async (file: any) => {
  if (!file || !file.path) {
    throw new Error("No file provided or file path missing");
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
      use_filename: true,
    });
    return result.secure_url;
  } catch (error: any) {
    throw new Error("Failed to upload images to Cloudinary: " + error.message);
  }
};
