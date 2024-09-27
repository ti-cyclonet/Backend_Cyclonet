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
router.get("/getmenuoptions", getMenuOptions);

// Obtiene una opción de menú dado su ID
router.get("/getmenuoption/:id", getMenuOptionById);

// Elimina una opción de menú dado su ID
router.delete("/menuoption/:id", deleteMenuOption);

// Actualiza una opcion de menú dado su ID
router.put("/menuoption/:id", updateMenuOption);

// Crea una nueva opción de menú
router.post("/createmenuoption", createMenuOption);

export default router;
