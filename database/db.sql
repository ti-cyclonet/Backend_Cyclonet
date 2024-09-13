-- -- Crear el esquema sc_Authorization
CREATE SCHEMA sc_Authorization;
-- --  Crear la tabla tblRoles en el esquema sc_Authorization
CREATE TABLE sc_Authorization."tblRoles" (
    id serial NOT NULL,
    strName VARCHAR (50) NOT NULL,
    strDescription1 VARCHAR (50) NOT NULL,
    strDescription2 VARCHAR (200),
    ingIdApplication INTEGER NOT NULL,
    CONSTRAINT pk_id_rol PRIMARY KEY (id)
);
-- Crear la tabla tblUsers en el esquema sc_Authorization
CREATE TABLE sc_Authorization."tblUsers" (
    id SERIAL NOT NULL,
    strUserName VARCHAR (50) NOT NULL UNIQUE,
    strPassword VARCHAR (60) NOT NULL,
    strStatus VARCHAR (15) NOT NULL,
    ingIdBasicData INTEGER,
    ingIdDependence INTEGER,
    dtmCreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_id_user PRIMARY KEY (id)
);
-- -- Crear la tabla tblUsersByRol en el esquema Authorization
CREATE TABLE sc_authorization."tblUsersByRol"
(
    id serial NOT NULL,
    ingIdUser integer NOT NULL,
    ingIdRol integer,
    CONSTRAINT pk_id_users_by_rol PRIMARY KEY (id),
    CONSTRAINT fk_id_user FOREIGN KEY (ingIdUser)
        REFERENCES sc_authorization."tblUsers" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_id_rol FOREIGN KEY (ingIdRol)
        REFERENCES sc_authorization."tblRoles" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
-- -- Insertar roles
INSERT INTO sc_Authorization."tblRoles" (strName, strDescription1, strDescription2, ingIdApplication)
VALUES 
    (
        'adminAuthoriza',
        'Administrator',
        'Acceso a todas las opciones de la aplicación',
        1
    ),
    (
        'adminShotra',
        'Administrator',
        'Acceso a todas las opciones de la aplicación',
        2
    ),
    (
        'adminInout',
        'Administrator',
        'Acceso a todas las opciones de la aplicación',
        3
    ),
    (
        'adminMagenta',
        'Administrator',
        'Acceso a todas las opciones de la aplicación',
        4
    ),
    (
        'adminF_a',
        'Administrator',
        'Acceso a todas las opciones de la aplicación',
        5
    ),
    (
        'userShotra',
        'Usuario',
        'Acceso sólo a las funciones principales',
        2
    );

-- Insertar un usuario básico
INSERT INTO sc_Authorization."tblUsers" (strUserName, strPassword, strStatus, ingIdBasicData, ingIdDependence, dtmCreateDate)
VALUES 
    (
        'amambyb',
        'admin123456',
        'Active',
        NULL,
        NULL,
        now()
    );
--  Asignar el rol "adminShotra" al usuario recien creado
INSERT INTO sc_Authorization."tblUsersByRol" (ingIdUser, ingIdRol)
VALUES ('1', '1');


--  CONSULTAS
SELECT * FROM sc_Authorization."tblUsers";
SELECT * FROM sc_Authorization."tblRoles";
SELECT * FROM sc_Authorization."tblUsersByRol";