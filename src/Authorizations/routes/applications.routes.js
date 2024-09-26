import { Router } from "express";
import {
  getApplications,
  getApplicationById,
  deleteApplication,
  updateApplication,
  createApplication,
} from "../controllers/applications.controllers.js";

const router = Router();

// Obtiene todas las aplicaciones
router.get("/applications", getApplications);

// Obtiene una aplicación dado su ID
router.get("/application/:id", getApplicationById);

// Elimina una aplicación dado su ID
router.delete("/application/:id", deleteApplication);

// Actualiza una aplicación dado su ID
router.put("/application/:id", updateApplication);

// Crea una nueva aplicación
router.post("/application", createApplication);

export default router;
