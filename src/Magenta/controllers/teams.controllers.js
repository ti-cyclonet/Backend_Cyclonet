import { pool } from "../../db.js";

// Obtiene todas los equipos
export const getTeams = async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM sc_magenta."tblTeams" ORDER BY ID ASC'
    );
    res.json(rows);
  };