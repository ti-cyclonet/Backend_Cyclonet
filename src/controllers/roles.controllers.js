import { pool } from "../db.js";

export const getRoles = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Authorization."tblRoles"'
  );
  res.json(rows);
};

export const getRolById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Authorization."tblRoles" WHERE id = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Rol not found." });
  }
  res.json(rows);
};

export const deleteRol = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_authorization."tblRoles"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Rol not found." });
  }
  return res.sendStatus(204);
};

export const updateRol = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_authorization."tblRoles" SET strName = $1, strDescription1 = $2, strDescription2 = $3 WHERE id = $4 RETURNING *',
    [data.strName, data.strDescription1, data.strDescription2, id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Rol not found." });
  }
  res.json(rows[0]);
};

export const createRol = async (req, res) => {
  try {
    const data = req.body;

    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Authorization."tblRoles" (strName, strDescription1, strDescription2, ingIdApplication) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        data.strName,
        data.strDescription1,
        data.strDescription2,
        data.ingIdApplication,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Rol not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Rol name already exists." });
    }
    return res.status(500).json({
      message: "Internat server error.",
      detail: error.detail,
    });
  }
};