import { Router } from "express";

import {
  getRoles,
  getRolById,
  createRol,
  deleteRol,
  updateRol,
} from "../controllers/roles.controllers.js";

const router = Router();

router.get("/roles", getRoles);

router.get("/rol/:id", getRolById);

router.delete("/rol/:id", deleteRol);

router.put("/rol/:id", updateRol);

router.post("/rol", createRol);

export default router;
