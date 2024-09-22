import { Router } from "express";
import {
  createUsersByRol,
  deleteUsersByRol,
  getRolsByUser,
  getUsersByRol,
  getUsersByRolByIdRol,
  getUsersByRolByIdUser,
  updateUsersByRol,
} from "../controllers/usersbyrol.controllers.js";

const router = Router();

// Obtiene todas las relaciones de Usuario por rol
router.get("/usersbyrol", getUsersByRol);

// Obtiene las relaciones de usuario por rol dado el ID del usuario
router.get("/usersbyrol/:id", getUsersByRolByIdUser);

// Obtiene las relaciones de usuario por rol dado el ID del rol
router.get("/usersbyrol/:id", getUsersByRolByIdRol);

// Elimina una relación de usuario por rol dado el ID de la relación
router.delete("/usersbyrol/:id", deleteUsersByRol);

// Actualiza una relación de usuario por rol dado el ID de la relación
router.put("/usersbyrol", updateUsersByRol);

// Permite asignar un nuevo rol a un usuario
router.post("/usersbyrol", createUsersByRol);

// Obtiene los roles a los que tiene acceso un usuario dado su UserName y su Password
router.get("/rolsbyuser", getRolsByUser);

export default router;
