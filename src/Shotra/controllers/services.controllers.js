import { pool } from "../../db.js";

// Obtiene todas las Servicios
export const getServices = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Shotra."tblServices" ORDER BY ID ASC'
  );
  res.json(rows);
};

// Obtener servicios por ID
export const getServiceById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Shotra."tblServices" WHERE id = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Services not found." });
  }
  res.json(rows);
};

// Elimina un Servicio dado su ID
export const deleteService = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_Shotra."tblServices"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Service not found." });
  }
  return res.sendStatus(204);
};

// Actualiza un servicio dado su ID
export const updateService = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_Shotra."tblSevices" SET strName = $1, WHERE id = $2 RETURNING *',
    [data.strName, id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Service not found." });
  }
  res.json(rows[0]);
};

// Crea un nuevo servicio.
export const createService = async (req, res) => {
  try {
    const data = req.body;

    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Shotra."tblServices" ("strName") VALUES ($1) RETURNING *',
      [data.strName]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Service not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Service name already exists." });
    }
    return res.status(500).json({
      message: "Internat server error.",
      detail: error.detail,
    });
  }
};
