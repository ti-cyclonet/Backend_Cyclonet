import { Router } from "express";
import {
  getApplications,
  getApplicationById,
  deleteApplication,
  updateApplication,
  createApplication,
  validateApplicationName,
} from "../controllers/applications.controllers.js";

const router = Router();

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
router.post("/api/createApplication", createApplication);

export default router;
