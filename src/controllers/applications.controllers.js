import { pool } from "../db.js";

export const getApplications = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Authorization."tblApplications"'
  );
  res.json(rows);
};

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

export const updateApplication = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_authorization."tblApplications" SET strName = $1, strDescription = $2, WHERE id = $3 RETURNING *',
    [data.strName, data.strDescription, id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Application not found." });
  }
  res.json(rows[0]);
};

export const createApplication = async (req, res) => {
  try {
    const data = req.body;

    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Authorization."tblApplications" (strName, strDescription ) VALUES ($1, $2) RETURNING *',
      [
        data.strName,
        data.strDescription,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Application not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Application name already exists." });
    }
    return res.status(500).json({
      message: "Internat server error.",
      detail: error.detail,
    });
  }
};