-- -- Crear el esquema sc_Authorization
CREATE SCHEMA sc_Authorization;
-- --  Crear la tabla tblRoles en el esquema sc_Authorization
CREATE TABLE sc_Authorization."tblRoles" (
    id serial NOT NULL,
    strName VARCHAR (50) NOT NULL UNIQUE,
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
-- Crear tabla Aplicacionbes
CREATE TABLE sc_authorization."tblApplications"
(
    id serial NOT NULL,
    strName character varying(100) NOT NULL UNIQUE,
    strDescription character varying(200),
    CONSTRAINT pk_id_application PRIMARY KEY (id)
);
-- -- Crear la tabla tblUsersByRol en el esquema Authorization
CREATE TABLE sc_authorization."tblUsersByRol"
(
    id serial NOT NULL,
    ingIdUser integer NOT NULL,
    ingIdRol integer NOT NULL,
    PRIMARY KEY (ingIdUser, ingIdRol),  -- Clave primaria compuesta
    FOREIGN KEY (ingIdUser) REFERENCES sc_Authorization."tblUsers"(id),
    FOREIGN KEY (ingIdRol) REFERENCES sc_Authorization."tblRoles"(id)
);
-- Crear la tabla opciones de menu para las aplicaciones
CREATE TABLE sc_authorization."tblMenuOptions"
(
    id serial NOT NULL,
    strName character varying(100) NOT NULL,
    strDescription character varying(200),
    strUrl character varying(500),
    strIcon character varying(100),
    strType character varying(50) NOT NULL,
    ingIdMPtather integer,
    ingOrder integer NOT NULL,
    ingIdApplication integer NOT NULL,
    CONSTRAINT pk_id_menu_option PRIMARY KEY (id),
    CONSTRAINT fk_id_application FOREIGN KEY (ingIdApplication)
        REFERENCES sc_authorization."tblApplications" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
-- Agregar una foreing key del campo ingIdMPather hacia la misma tabla tblMenuOptions
ALTER TABLE sc_authorization."tblMenuOptions"
ADD CONSTRAINT fk_id_menu_option_pather
FOREIGN KEY (ingIdMPtather)
REFERENCES sc_authorization."tblMenuOptions" (id)
ON UPDATE NO ACTION
ON DELETE NO ACTION;
---- Insertar Aplicaciones
INSERT INTO sc_authorization."tblApplications" ("strName", "strDescription")
	VALUES 
    (
        'Authoriza', 
        'Access Control For CycloNet Applications'
    ),
    (
        'Inout', 
        'Inventory Management'
    ),
    (
        'Shotra', 
        'Collaboration And Recommendation Network'
    ),
    (
        'Magenta', 
        'Management General Tasks'
    ),
    (
        'AidCash', 
        'Financial Aid Cash'
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

-- /////////////////////////////////////////////////////////////////////////////
-- -- Crear el esquema sc_Authorization
CREATE SCHEMA sc_Magenta;

-- /////////////////////////////////////////////////////////////////////////////
-- -- Crear el esquema sc_Shotra
CREATE SCHEMA sc_Shotra;
-- crear la tabla Servicio.
CREATE TABLE sc_shotra."tblServices"
(
    id serial NOT NULL,
    strName character varying(100) NOT NULL,/
    CONSTRAINT pk_id_services PRIMARY KEY (id)
);

-- ///////////////////////////////////////////////////////////////////////////////