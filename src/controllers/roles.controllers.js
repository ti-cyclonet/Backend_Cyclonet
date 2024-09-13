import { pool } from "../db.js";

export const getRoles = async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM sc_Authorization."tblRoles"'
    );
    res.json(rows);
  }