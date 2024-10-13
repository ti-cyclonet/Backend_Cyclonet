import { Router } from "express";
import { createRequest, deleteRequest, getRequestbyid, getRequests, updateRequest } from "../controllers/requests.controllers.js";

const router = Router();

// Obtiene todas las solicitudes
router.get("/getrequests", getRequests);

// Obtiene una solicitud dado su ID
router.get("/getrequest/:id", getRequestbyid);

// Elimina una solicitud dado su ID
router.delete("/deleterequest/:id", deleteRequest);

// Actualiza una solicitud dado su ID
router.put("/updaterequest/:id", updateRequest);

// Crea una nueva solicitud
router.post("/createrequest", createRequest);


export default router;