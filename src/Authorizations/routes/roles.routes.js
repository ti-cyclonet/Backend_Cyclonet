import { Router } from "express";

import {
  getRoles,
  getRolById,
  createRol,
  deleteRol,
  updateRol,
} from "../controllers/roles.controllers.js";

const router = Router();

//Obtener todos los roles
router.get("/roles", getRoles);

//Obtener rol por ID
router.get("/rol/:id", getRolById);

//Eliminar un rol dado su ID
router.delete("/rol/:id", deleteRol);

//Actualizar un rol dado su ID
router.put("/rol/:id", updateRol);

//Crear un nuevo rol
router.post("/rol", createRol);

export default router;
