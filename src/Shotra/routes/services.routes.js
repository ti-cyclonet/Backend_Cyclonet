import { Router } from "express";
import { getServices } from "../controllers/services.controllers.js";


const router = Router();

// Obtiene todas las servicios
router.get("/getservices", getServices);

export default router;