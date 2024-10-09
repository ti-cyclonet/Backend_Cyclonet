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
router.get("/applications", getApplications);

// Obtiene una aplicación por el nombre
router.post("/validateApplicationName", validateApplicationName);

// Obtiene una aplicación dado su nombre

// Elimina una aplicación dado su ID
router.delete("/application/:id", deleteApplication);

// Actualiza una aplicación dado su ID
router.put("/application/:id", updateApplication);

// Crea una nueva aplicación
router.post("/createApplication", createApplication);

export default router;
