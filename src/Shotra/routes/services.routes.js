import { Router } from "express";
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/services.controllers.js";

const router = Router();

// Obtiene todas las servicios
router.get("/getservices", getServices);

//Obtener Servicios por ID
router.get("/getservicebyid/:id", getServiceById);

// Elimina un Servicio dado su ID
router.delete("/deleteservicebyid/:id", deleteService);

// Actualiza un servicio dado su ID
router.put("/updateservicebyid/:id", updateService);

// Crea un servicio
router.post("/createservice", createService);

export default router;
