import { pool } from "../db.js";

// Obtiene todas las relaciones de Usuario por rol
export const getUsersByRol = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sc_Authorization."tblUsersByRol" ORDER BY ID ASC'
  );
  res.json(rows);
};

// Obtiene las relaciones de usuario por rol dado el ID del usuario
export const getUsersByRolByIdUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Authorization."tblUsersByRol" WHERE ingIdUser = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Relation of User By Rol not found." });
  }
  res.json(rows);
};

// Obtiene las relaciones de usuario por rol dado el ID del rol
export const getUsersByRolByIdRol = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM sc_Authorization."tblUsersByRol" WHERE ingIdRol = ${id}`
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "Relation of User By Rol not found." });
  }
  res.json(rows);
};

// Elimina una relación de usuario por rol dado el ID de la relación
export const deleteUsersByRol = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM sc_authorization."tblUsersByRol"	WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Relation of User By Rol not found." });
  }
  return res.sendStatus(204);
};

// Actualiza una relación de usuario por rol dado el ID de la relación
export const updateUsersByRol = async (req, res) => {
    const data = req.body;
    console.log(data);
  
    try {
      // Verificar si ingIdUser existe en tblUsers
      const userResult = await pool.query(
        'SELECT * FROM sc_Authorization."tblUsers" WHERE id = $1',
        [data.ingIdUser]
      );
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User does not exist." });
      }
  
      // Verificar si ingIdRol existe en tblRoles
      const rolResult = await pool.query(
        'SELECT * FROM sc_Authorization."tblRoles" WHERE id = $1',
        [data.ingIdRol]
      );
      if (rolResult.rows.length === 0) {
        return res.status(404).json({ message: "Role does not exist." });
      }
  
      // Verificar si la relación actual existe para actualizarla
      const relationResult = await pool.query(
        'SELECT * FROM sc_Authorization."tblUsersByRol" WHERE ingiduser = $1',
        [data.ingIdUser]
      );
      if (relationResult.rows.length === 0) {
        return res.status(404).json({ message: "The user does not have a role assigned yet." });
      }
  
      // Actualizar la relación basada en ingIdUser e ingIdRol
      const { rows, rowCount } = await pool.query(
        'UPDATE sc_Authorization."tblUsersByRol" SET ingidrol = $2 WHERE ingiduser = $1 RETURNING *',
        [data.ingIdUser, data.ingIdRol]
      );
  
      if (rowCount === 0) {
        return res.status(404).json({ message: "Relation of User By Rol not updated." });
      }
  
      res.json(rows[0]);
  
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error.",
        detail: error.detail,
      });
    }
};

// Permite asignar un nuevo rol a un usuario
export const createUsersByRol = async (req, res) => {
try {
    const data = req.body;

    // Verificar si ingIdUser existe en tblUsers
    const userResult = await pool.query(
    'SELECT * FROM sc_Authorization."tblUsers" WHERE id = $1',
    [data.ingIdUser]
    );    
    if (userResult.rows.length === 0) {
    return res.status(404).json({ message: "User does not exist." });
    }

    // Verificar si ingIdRol existe en tblRoles
    const rolResult = await pool.query(
    'SELECT * FROM sc_Authorization."tblRoles" WHERE id = $1',
    [data.ingIdRol]
    );
    if (rolResult.rows.length === 0) {
    return res.status(404).json({ message: "Role does not exist." });
    }
            
    // Insertar la nueva relación solo si ambos existen y no hay duplicados
    const { rows, rowCount } = await pool.query(
    'INSERT INTO sc_Authorization."tblUsersByRol" (ingIdUser, ingIdRol) VALUES ($1, $2) RETURNING *',
    [data.ingIdUser, data.ingIdRol]
    );

    if (rowCount === 0) {
    return res.status(404).json({ message: "Relation of User By Rol not inserted." });
    }

    res.json(rows[0]);
} catch (error) {
    if (error.code === "23505") {
    return res.status(409).json({ message: "Relation of User By Rol already exists." });
    }
    return res.status(500).json({
    message: "Internal server error.",
    detail: error.detail,
    });
}
};

// Obtiene los roles a los que tiene acceso un usuario dado su UserName y su Password
export const getRolsByUser = async (req, res) => {
  try {
    const { strUserName, strPassword, strApplication } = req.body;

    const { rows } = await pool.query(
      `SELECT 
          r.id AS role_id, 
          r.strname AS role_name, 
          a.strname AS application_name
      FROM 
          sc_Authorization."tblUsers" u
      JOIN 
          sc_Authorization."tblUsersByRol" ur ON u.id = ur.ingiduser
      JOIN 
          sc_Authorization."tblRoles" r ON ur.ingidrol = r.id
      JOIN 
          sc_Authorization."tblApplications" a ON r.ingidapplication = a.id
      WHERE 
          u.strusername = $1
          AND u.strpassword = $2
          AND a.strname = $3`,  // Filtro adicional por el nombre de la aplicación
      [strUserName, strPassword, strApplication]
    );

    // Verificar si no se encontraron roles para el usuario en esa aplicación
    if (rows.length === 0) {
      return res.status(404).json({ message: "No roles found for this user in the specified application." });
    }

    // Enviar los roles como respuesta
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
      detail: error.message,
    });
  }
};