import { Router } from "express";
import { getTeams } from "../controllers/teams.controllers.js";

const router = Router();

// Obtiene todas los Equipos 
router.get("/getteams", getTeams);

export default router;