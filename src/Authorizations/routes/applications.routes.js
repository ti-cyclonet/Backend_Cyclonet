import { Router } from "express";
import multer from "multer";
import { pool } from "../../db.js";
import {
  getApplications,
  getApplicationById,
  deleteApplication,
  updateApplication,
  validateApplicationName,
  createApplication
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
router.post("/api/createApplication", upload.single("logo"), createApplication);

export default router;
