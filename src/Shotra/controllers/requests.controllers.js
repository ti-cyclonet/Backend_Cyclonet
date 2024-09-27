import { pool } from "../../db.js";

// Obtiene todas las solicitudes
export const getRequests = async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM sc_Shotra."tblRequests" ORDER BY ID ASC'
    );
    res.json(rows);
  };