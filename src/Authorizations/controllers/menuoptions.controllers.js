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

// Crea una nueva opción de menú y sus relaciones
export const createMenuOption = async (req, res) => {
  try {
    const data = req.body;

    // Verificar si el rol corresponde a la aplicación
    const { rows: roleAppRows } = await pool.query(
      `SELECT COUNT(*) AS count
       FROM sc_authorization."tblRoles"
       WHERE ingIdApplication = $1 AND id = $2`,
      [data.ingIdApplication, data.ingIdRol]
    );

    if (parseInt(roleAppRows[0].count) === 0) {
      return res.status(400).json({ message: "The application does not correspond to the role." });
    }

    // Insertar la nueva opción de menú
    const { rows: menuRows, rowCount: menuRowCount } = await pool.query(
      `INSERT INTO sc_Authorization."tblMenuOptions"
       (strname, strdescription, strurl, stricon, strtype, ingidmptather, ingorder, ingidapplication)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        data.strName,
        data.strDescription,
        data.strUrl,
        data.strIcon,
        data.strType,
        data.ingIdMPtather,  // Puede ser null, asegúrate de manejarlo en el front
        data.ingOrder,
        data.ingIdApplication
      ]
    );

    if (menuRowCount === 0) {
      return res.status(404).json({ message: "Menu option not inserted." });
    }

    // Obtener el ID de la opción de menú recién creada
    const newMenuOptionId = menuRows[0].id;

    // Insertar la relación en la tabla de roles y opciones de menú
    const { rowCount: relationRowCount } = await pool.query(
      `INSERT INTO sc_Authorization."tblMenuOptionsByRol"
       (ingIdRol, ingIdMenuOption)
       VALUES ($1, $2)`,
      [data.ingIdRol, newMenuOptionId]
    );

    if (relationRowCount === 0) {
      return res.status(500).json({ message: "Relation not created between role and menu option." });
    }

    // Respuesta exitosa con la nueva opción de menú creada
    res.json(menuRows[0]);
  } catch (error) {
    if (error.code === "23505") {  // Violación de restricción única (nombre de la opción de menú ya existe)
      return res.status(409).json({ message: "Menu option name already exists." });
    }
    return res.status(500).json({
      message: "Internal server error.",
      detail: error.detail,
    });
  }
};