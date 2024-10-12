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
router.get("/api/roles", getRoles);

//Obtener rol por ID
router.get("/api/rol/:id", getRolById);

//Eliminar un rol dado su ID
router.delete("/api/rol/:id", deleteRol);

//Actualizar un rol dado su ID
router.put("/api/rol/:id", updateRol);

//Crear un nuevo rol
router.post("/api/rol", createRol);

export default router;
