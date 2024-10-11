import colors from "colors";
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import userRoutes from "./Authorizations/routes/users.routes.js";
import rolesRoutes from "./Authorizations/routes/roles.routes.js";
import usersbyrolRoutes from "./Authorizations/routes/usersbyrol.routes.js";
import menuoptionsRoutes from "./Authorizations/routes/menuoptions.routes.js";
import applicationsRoutes from "./Authorizations/routes/applications.routes.js";
import servicesroutes from "./Shotra/routes/services.routes.js";
import teamsRoutes from "./Magenta/routes/teams.routes.js";
import requestsRoutes from "./Shotra/routes/requests.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(rolesRoutes);
app.use(applicationsRoutes);
app.use(usersbyrolRoutes);
app.use(menuoptionsRoutes);
app.use(servicesroutes);
app.use(teamsRoutes);
app.use(requestsRoutes);

// Configuración CORS con opciones detalladas
// app.use(
//   cors({
//     origin: "http://localhost:4200", // Permitir solo desde tu frontend
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
//     allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
//     credentials: true, // Permitir cookies (si es necesario)
//   })
// );

// Habilitar CORS para solicitudes desde 'http://localhost:4200'

// Manejar solicitudes preflight (OPTIONS)
app.options('*', cors()); // Permitir que todas las rutas respondan a OPTIONS

app.use(cors({
  origin: 'http://localhost:4200', // Permitir solicitudes solo desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"], // Métodos permitidos
  allowedHeaders: ['Content-Type', "Authorization", "Accept", "Referer"], // Cabeceras permitidas
}));

app.options("*", cors()); // Permite todas las solicitudes OPTIONS

app.listen(PORT);

console.log(" CycloNet Server ".bgCyan.black, "listening on port", PORT);
