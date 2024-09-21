import colors from "colors";
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import applicationsRoutes from "./routes/applications.routes.js";
import usersbyrolRoutes from "./routes/usersbyrol.routes.js";

import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(rolesRoutes);
app.use(applicationsRoutes);
app.use(usersbyrolRoutes);

// Configuración de CORS para permitir todas las solicitudes de cualquier origen
app.use(cors());

app.listen(PORT);

console.log(" CycloNet Server ".bgCyan.black, "listening on port", PORT);
