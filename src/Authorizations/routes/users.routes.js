import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router(); 

//Obtener todos los usuarios
router.get("/api/users", getUsers);

//Obtener un usuario dado su ID
router.get("/api/user/:id", getUserById);

//Eliminar un usuario dado su ID
router.delete("/api/user/:id", deleteUser);

//Actualizar un usuario dado su ID
router.put("/api/user/:id", updateUser);

//Crear un nuevo usuario
router.post("/api/user", createUser);

export default router;
