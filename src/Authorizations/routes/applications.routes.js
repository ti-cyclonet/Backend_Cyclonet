import { Router } from "express";
import multer from "multer";
import { pool } from "../../db.js";
import {
  getApplications,
  getApplicationById,
  deleteApplication,
  updateApplication,
  validateApplicationName,
} from "../controllers/applications.controllers.js";

const router = Router();

const storage = multer.diskStorage({
  filename: function (res, file, cb) {
    const ext = file.originalname.split(".").pop(); //jpg pdf
    const filename = Date.now();
    cb(null, `${filename}.${ext}`);
  },
  destination: function (res, file, cb) {
    cb(null, `./public`);
  },
});

const upload = multer({ storage });

// Obtiene todas las aplicaciones
router.get("/api/applications", getApplications);

// Obtiene una aplicación por el nombre
router.post("/api/validateApplicationName", validateApplicationName);

// Obtiene una aplicación dado su nombre

// Elimina una aplicación dado su ID
router.delete("/api/application/:id", deleteApplication);

// Actualiza una aplicación dado su ID
router.put("/api/application/:id", updateApplication);

// Crea una nueva aplicación
router.post(
  "/api/createApplication",
  upload.single("logo"),
  async (req, res) => {
    try {
      // const data = req.body;
      const appName = req.body.strName;
      const appDescription = req.body.strDescription;
      const file = req.file.filename;
      const imageUrl = `http://localhost:3000/${file}`;
      console.log('APPLICATION NAME: ', appName);
      console.log('APPLICATION DESCRIPTION: ', appDescription);
      console.log("URL DE LA IMAGEN: ", imageUrl);

      // Sube la imagen a Cloudinary
      // const uploadResult = await uploadImage(imageUrl, file);

      // Genera la URL optimizada de la imagen
      // const optimizedImageUrl = getOptimizedUrl(uploadResult.public_id);

      // Inserta la nueva aplicación en la base de datos con la URL de la imagen optimizada
      const { rows, rowCount } = await pool.query(
        'INSERT INTO sc_Authorization."tblApplications" (strName, strDescription, strLogo) VALUES ($1, $2, $3) RETURNING *',
        [appName, appDescription, imageUrl]
      );

      if (rowCount === 0) {
        return res.status(404).json({ message: "Application not inserted." });
      }

      res.json(rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        return res
          .status(409)
          .json({ message: "Application name already exists." });
      }
      return res.status(500).json({
        message: "Internal server error.",
        detail: error.detail,
      });
    }
  }
);

export default router;
