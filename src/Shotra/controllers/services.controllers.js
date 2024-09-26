import { pool } from "../../db.js";

// Obtiene todas las Servicios
export const getServices = async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM sc_Shotra."tblServices" ORDER BY ID ASC'
    );
    res.json(rows);
  };