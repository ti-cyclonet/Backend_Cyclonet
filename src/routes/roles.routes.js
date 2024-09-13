import { Router } from "express";

import { getRoles } from "../controllers/roles.controllers.js";

const router = Router();

router.get("/roles", getRoles);

// router.get("/user/:id", getUserById);

// router.post("/user", createUser);

// router.delete("/user/:id", deleteUser);

// router.put("/user/:id", updateUser);

export default router;
