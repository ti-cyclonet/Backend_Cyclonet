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
router.get("/users", getUsers);

//Obtener un usuario dado su ID
router.get("/user/:id", getUserById);

//Eliminar un usuario dado su ID
router.delete("/user/:id", deleteUser);

//Actualizar un usuario dado su ID
router.put("/user/:id", updateUser);

//Crear un nuevo usuario
router.post("/user", createUser);

export default router;
