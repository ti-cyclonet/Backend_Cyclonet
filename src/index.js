import colors from "colors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import multer from 'multer';
import path from 'path';

import "dotenv/config";
import { PORT } from "./config.js";
import userRoutes from "./Authorizations/routes/users.routes.js";
import rolesRoutes from "./Authorizations/routes/roles.routes.js";
import usersbyrolRoutes from "./Authorizations/routes/usersbyrol.routes.js";
import menuoptionsRoutes from "./Authorizations/routes/menuoptions.routes.js";
import applicationsRoutes from "./Authorizations/routes/applications.routes.js";
import servicesroutes from "./Shotra/routes/services.routes.js";
import teamsRoutes from "./Magenta/routes/teams.routes.js";
import requestsRoutes from "./Shotra/routes/requests.routes.js";

dotenv.config(); // Carga las variables de entorno

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Referer"],
  })
);

app.options("*", cors());

app.use(userRoutes);
app.use(rolesRoutes);
app.use(applicationsRoutes);
app.use(usersbyrolRoutes);
app.use(menuoptionsRoutes);
app.use(servicesroutes);
app.use(teamsRoutes);
app.use(requestsRoutes);

const storage = multer.diskStorage({
  filename: function (res, file, cb) {
    const ext = file.originalname.split(".").pop(); 
    const filename = Date.now();
    cb(null, `${fileName}.${ext}`);
  }
});

export const upload = multer({ storage });

app.listen(PORT);

console.log(" CycloNet Server ".bgCyan.black, "listening on port", PORT);
