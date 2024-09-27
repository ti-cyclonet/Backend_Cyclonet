import { pool } from "../../db.js";

// Obtiene todas las opciones de menú de las aplicaciones
export const getMenuOptions = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Authorization."tblMenuOptions" ORDER BY ID ASC'
  );
  res.json(rows);
};

// Obtiene una opción de menú dado su ID
export const getMenuOptionById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Authorization."tblMenuOptions" WHERE id = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Option menu not found." });
  }
  res.json(rows);
};

// Elimina una opción de menú dado su ID
export const deleteMenuOption = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_authorization."tblMenuOptions"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Menu option not found." });
  }
  return res.sendStatus(204);
};

// Actualiza una opción de menú dado su ID
export const updateMenuOption = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows, rowCount } = await pool.query(
    'UPDATE sc_authorization."tblMenuOptions" SET strname=$1, strdescription=$2, strurl=$3, stricon=$4, strtype=$5, ingidmptather=$6, ingorder=$7, ingidapplication=$8  WHERE id = $9 RETURNING *',
    [
      data.strName,
      data.strDescription,
      data.strUrl,
      data.strIcon,
      data.strType,
      data.ingIdMPtather,
      data.ingOrder,
      data.ingIdApplication,
      id,
    ]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Menu option not found." });
  }
  res.json(rows[0]);
};

// Crea una nueva opción de menú
export const createMenuOption = async (req, res) => {
  try {
    const data = req.body;

    const { rows, rowCount } = await pool.query(
      'INSERT INTO sc_Authorization."tblMenuOptions" (strName, strDescription, strUrl, strIcon, strType, ingIdMPtather, ingOrder, ingIdApplication ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        data.strName,
        data.strDescription,
        data.strUrl,
        data.strIcon,
        data.strType,
        data.ingIdMPtather,
        data.ingOrder,
        data.ingIdApplication,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Menu option not inserted." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Menu option name already exists." });
    }
    return res.status(500).json({
      message: "Internat server error.",
      detail: error.detail,
    });
  }
};
