# Backend

Es una aplicación desarrollada utilizando Express y MongoDB como base de datos.

## Explicación de los archivos:

El proyecto sigue la siguiente estructura de carpetas y archivos:

- **config**: Contiene la configuración del proyecto.
  - **config.js**: Archivo de configuración principal.

- **model**: Contiene los modelos de datos utilizados por la aplicación.
  - **product.js**: Modelo para representar los productos en la base de datos.
  - **user.js**: Modelo para representar los usuarios en la base de datos.

- **routes**: Contiene las rutas y controladores de la aplicación.
  - **product.js**: Archivo de rutas y controladores para las operaciones relacionadas con los productos.
  - **user.js**: Archivo de rutas y controladores para las operaciones relacionadas con los usuarios.

- **package.json**: Archivo de configuración de npm que contiene las dependencias y scripts del proyecto.

- **package-lock.json**: Archivo generado automáticamente por npm para asegurar la consistencia de las dependencias.


## Estructura del proyecto

backend/
├── config/
│   └── config.js
├── model/
│   ├── product.js
│   └── user.js
├── routes/
│   ├── product.js
│   └── user.js
├── package.json
├── package-lock.json
└── README.md