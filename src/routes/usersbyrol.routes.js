import { Router } from "express";
import {
  createUsersByRol,
  deleteUsersByRol,
  getRolsByUser,
  getUsersByRol,
  getUsersByRolById,
  updateUsersByRol,
} from "../controllers/usersbyrol.controllers.js";

const router = Router();

router.get("/usersbyrol", getUsersByRol);

router.get("/usersbyrol/:id", getUsersByRolById);

router.delete("/usersbyrol/:id", deleteUsersByRol);

router.put("/usersbyrol", updateUsersByRol);

router.post("/usersbyrol", createUsersByRol);

router.get("/rolsbyuser", getRolsByUser);

export default router;
