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
import dotenv from 'dotenv';
import { cloudinary } from "./Authorizations/services/cloudinary.service.js"; // Importa Cloudinary

dotenv.config(); // Carga las variables de entorno

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
  allowedHeaders: ['Content-Type', "Authorization", "Accept", "Referer"],
}));

app.options("*", cors());

app.use(userRoutes);
app.use(rolesRoutes);
app.use(applicationsRoutes);
app.use(usersbyrolRoutes);
app.use(menuoptionsRoutes);
app.use(servicesroutes);
app.use(teamsRoutes);
app.use(requestsRoutes);

app.listen(PORT);

console.log(" CycloNet Server ".bgCyan.black, "listening on port", PORT);
