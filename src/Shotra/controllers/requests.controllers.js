import { pool } from "../../db.js";

// Obtiene todas las solicitudes
export const getRequests = async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM sc_Shotra."tblRequests" ORDER BY ID ASC'
    );
    res.json(rows);
  };

  // Obtiene una solicitud dado su ID
export const getRequestbyid = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Shotra."tblRequests" WHERE id = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Request not found." });
  }
  res.json(rows);
};

// Elimina una solicitud dado su ID
export const deleteRequest = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_Shotra."tblRequests"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Request not found." });
  }
  return res.sendStatus(204);
};

// Actualiza una solicitud dado su ID
export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_Shotra."tblRequests" SET strname = $1, strdescription = $2  WHERE id = $3 RETURNING *',
    [data.strName, data.strDescription, id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Request not found." });
  }
  res.json(rows[0]);
};

// Crea una nueva solicitud
export const createRequest = async (req, res) => {
  try {
    const data = req.body;

    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Shotra."tblRequests" ("strName", "strDescription" ) VALUES ($1, $2) RETURNING *',
      [data.strName, data.strDescription]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Request not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Request name already exists." });
    }
    return res.status(500).json({
      message: "Internat server error.",
      detail: error.detail,
    });
  }
};