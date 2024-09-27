import { Router } from "express";
import { getRequests } from "../controllers/requests.controllers.js";

const router = Router();

// Obtiene todas las solicitudes
router.get("/getrequests", getRequests);


export default router;