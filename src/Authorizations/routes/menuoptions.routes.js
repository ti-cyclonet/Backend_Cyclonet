import { Router } from "express";
import {
    createMenuOption,
  deleteMenuOption,
  getMenuOptionById,
  getMenuOptions,
  updateMenuOption,
} from "../controllers/menuoptions.controllers.js";

const router = Router();

// Obtiene todas las opciones de menú de las aplicaciones
router.get("/api/getmenuoptions", getMenuOptions);

// Obtiene una opción de menú dado su ID
router.get("/api/getmenuoption/:id", getMenuOptionById);

// Elimina una opción de menú dado su ID
router.delete("/api/menuoption/:id", deleteMenuOption);

// Actualiza una opcion de menú dado su ID
router.put("/api/menuoption/:id", updateMenuOption);

// Crea una nueva opción de menú
router.post("/api/createmenuoption", createMenuOption);

export default router;
