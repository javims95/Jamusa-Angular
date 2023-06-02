# Frontend

Este es el frontend de una aplicación desarrollada utilizando Angular. Proporciona una interfaz de usuario interactiva para interactuar con el backend y brinda características como servicios, guards, zona de administración y diversos componentes.

## Características

El frontend consta de los siguientes elementos principales:

- **Servicios**: Los servicios son clases que se utilizan para compartir datos y lógica entre diferentes componentes. Proporcionan funcionalidades comunes y facilitan la comunicación con el backend.

- **Guards**: Los guards son utilizados para proteger las rutas y controlar el acceso a determinadas funcionalidades de la aplicación. Se encargan de verificar si un usuario tiene los permisos necesarios para acceder a una ruta o realizar una acción específica.

- **Zona de Administración**: La zona de administración es una sección especial de la aplicación destinada a usuarios con privilegios de administrador. Aquí se encuentran funcionalidades y vistas específicas para administrar y configurar la aplicación.

- **Componentes**: El frontend cuenta con varios componentes que proporcionan la interfaz de usuario para diferentes partes de la aplicación.
  - **Home**: Componente que muestra la página de inicio de la aplicación.
  - **Layouts**: Componentes de diseño que definen la estructura visual de las páginas.
  - **Login**: Componente de inicio de sesión que permite a los usuarios autenticarse en la aplicación.
  - **My Account**: Componente que muestra la información y configuración de la cuenta del usuario.
  - **Register**: Componente de registro que permite a los usuarios crear nuevas cuentas en la aplicación.

## Estructura del Proyecto

El proyecto sigue una estructura típica de una aplicación Angular:

- **src**: Esta carpeta contiene todo el código fuente de la aplicación.
  - **app**: Aquí se encuentran los archivos principales de la aplicación.
    - **services**: Contiene los servicios utilizados para comunicarse con el backend y compartir datos entre componentes.
    - **guards**: Contiene los guards utilizados para proteger las rutas y controlar el acceso.
    - **admin**: Carpeta que contiene los componentes y módulos relacionados con la zona de administración.
    - **components**: Carpeta que contiene los diferentes componentes de la aplicación.
    - **layouts**: Carpeta que contiene los componentes de diseño utilizados para estructurar las páginas.
  - **assets**: Esta carpeta contiene archivos estáticos como imágenes, fuentes, etc.
  - **styles**: Aquí se encuentran los archivos de estilos CSS para la aplicación.

- **node_modules**: Esta carpeta es generada automáticamente por npm y contiene todas las dependencias del proyecto.

- **package.json**: Archivo de configuración de npm que contiene las dependencias, scripts y metadatos del proyecto.

- **README.md**: Archivo de documentación que proporciona información sobre el proyecto, su configuración y uso.

Esta estructura de carpetas proporciona una organización lógica y modular para el frontend de tu aplicación Angular. Asegúrate de ajustarla según las necesidades específicas de tu proyecto.
