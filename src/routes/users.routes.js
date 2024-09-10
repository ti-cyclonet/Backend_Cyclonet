import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router(); 

router.get("/users", getUsers);

router.get("/user/:id", getUserById);

router.post("/user", createUser);

router.delete("/user/:id", deleteUser);

router.put("/user/:id", updateUser);

export default router;
