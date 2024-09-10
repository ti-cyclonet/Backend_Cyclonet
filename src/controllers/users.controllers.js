import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Authorization."tblUsers"'
  );
  res.json(rows);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Authorization."tblUsers" WHERE id = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found." });
  }
  res.json(rows);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;

    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Authorization."tblUsers" (strUserName, strPassword, strStatus, ingIdBasicData, ingIdDependence) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        data.strUserName,
        data.strPassword,
        data.strStatus,
        data.ingIdBasicData,
        data.ingIdDependence,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "UserName already exists." });
    }
    return res.status(500).json({
      message: "Internat server error.",
      detail: error.detail,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_authorization."tblUsers"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found." });
  }
  return res.sendStatus(204);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_authorization."tblUsers" SET strusername = $1, strpassword = $2, strstatus = $3 WHERE id = $4 RETURNING *',
    [data.strUserName, data.strPassword, data.strStatus, id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found." });
  }
  res.json(rows[0]);
};
