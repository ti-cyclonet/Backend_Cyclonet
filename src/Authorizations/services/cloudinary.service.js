import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import multer from 'multer';

// Configura Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
// Configura el almacenamiento de multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'images', 
    allowedFormats: ['jpg', 'png', 'jpeg'],
    // Puedes establecer otros parámetros como el nombre del archivo
  },
});
export const getOptimizedUrl = (publicId) => {
  // Lógica para generar la URL optimizada
  return `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/q_auto,f_auto/${publicId}`;
};

// Configura multer
export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: 'your-folder-name', // Opcional: nombre de la carpeta en Cloudinary
    });
    return result;
  } catch (error) {
    throw new Error('Error uploading image');
  }
};
