import { pool } from "../../db.js";
import cloudinary from "../../cloudinaryConfig.js";
import fs from "fs";

// Obtiene todas las aplicaciones
export const getApplications = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Authorization."tblApplications" ORDER BY ID ASC'
  );
  res.json(rows);
};

// Obtiene una aplicación dado su ID
export const getApplicationById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Authorization."tblApplications" WHERE id = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Application not found." });
  }
  res.json(rows);
};

// Verifica si el nombre de la aplicación está disponible
export const validateApplicationName = async (req, res) => {
  const { name } = req.body; // Se obtiene el nombre de la aplicación del body de la solicitud

  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) AS name_exists FROM sc_Authorization."tblApplications" WHERE strName = $1`,
      [name] // Usamos parámetros para evitar inyección SQL
    );

    // Si el nombre ya está en uso, devolvemos false
    if (rows[0].name_exists > 0) {
      const response = {
        available: false, // El nombre no está disponible
        message: "Application name not available. Please try another one.",
      };

      console.log("Server response:", response); // Imprime el objeto de respuesta
      return res.json(response);
    }

    // Si el nombre no está en uso, devolvemos true
    const response = {
      available: true, // El nombre está disponible
      message: "Application name is available.",
    };

    console.log("Server response:", response); // Imprime el objeto de respuesta
    return res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Elimina una aplicación dado su ID
export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_authorization."tblApplications"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Application not found." });
  }
  return res.sendStatus(204);
};

// Actualiza una aplicación dado su ID
export const updateApplication = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_authorization."tblApplications" SET strname = $1, strdescription = $2, strlogo = $3  WHERE id = $4 RETURNING *',
    [data.strName, data.strDescription, data.strLogo, id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Application not found." });
  }
  res.json(rows[0]);
};

// Crea una nueva aplicación
export const createApplication = async (req, res) => {
  try {
    const appName = req.body.strName;
    const appDescription = req.body.strDescription;

    // Verifica si se subió un archivo
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Sube la imagen a Cloudinary
    const pathFile = req.file.path; // multer guarda el archivo temporalmente en `req.file.path`
    const config = {
      folder: "logos-applications", // carpeta donde guardarás las imágenes en Cloudinary
    };

    const result = await cloudinary.uploader.upload(pathFile, config); // sube a Cloudinary
    const imageUrl = result.secure_url; // obtiene la URL segura de la imagen

    // Elimina el archivo temporal una vez que se ha subido a Cloudinary
    fs.unlink(pathFile, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    // Inserta la nueva aplicación en la base de datos con la URL de la imagen
    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Authorization."tblApplications" (strName, strDescription, strLogo) VALUES ($1, $2, $3) RETURNING *',
      [appName, appDescription, imageUrl] // usa la URL de Cloudinary
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Application not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Application name already exists." });
    }
    return res.status(500).json({
      message: "Internal server error.",
      detail: error.detail,
    });
  }
};
