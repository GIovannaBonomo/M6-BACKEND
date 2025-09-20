import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

//per salvare l'immagine su cloudinary
const strogeCloudinary = new CloudinaryStorage({
  cloudinary,
  params: { 
    folder: "M6-Backend",
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}
});

const uploadCloudinary = multer({ storage: strogeCloudinary });
//diciamo a storage di usare cloudinary

export default uploadCloudinary;