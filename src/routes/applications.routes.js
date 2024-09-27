import { Router } from "express";
import {
  getApplications,
  getApplicationById,
  deleteApplication,
  updateApplication,
  createApplication,
} from "../controllers/applications.controllers.js";

const router = Router();

router.get("/applications", getApplications);

router.get("/application/:id", getApplicationById);

router.delete("/application/:id", deleteApplication);

router.put("/application/:id", updateApplication);

router.post("/application", createApplication);

export default router;
