import { Router } from "express";
import { getMenuOptions } from "../controllers/menuoptions.controllers.js";

const router = Router();

// Obtiene todas las opciones de menú de las aplicaciones
router.get("/getmenuoptions", getMenuOptions);

export default router;