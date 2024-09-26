import { pool } from "../../db.js";

// Obtiene todas las opciones de menú de las aplicaciones
export const getMenuOptions = async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM sc_Authorization."tblMenuOptions" ORDER BY ID ASC'
    );
    res.json(rows);
  };