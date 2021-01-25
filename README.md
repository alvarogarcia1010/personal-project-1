# React Data Client

URL: [https://react-data-client.vercel.app/](https://react-data-client.vercel.app/)

Versión: 1.0

Cliente realizado en react para consumir datos de [Alvaro's api](https://laravel-api-rest-nmtpm.ondigitalocean.app/), incluye autenticación, recuperación de contraseña y un CRUD especifico para productos y uno para usuarios, ademas de poder realizar acciones como buscar un producto en específico.

## Indice
  - [Requisitos](#requisitos)
  - [Principales paquetes utilizados](#principales-paquetes-utilizados)
  - [Instalación](#instalación)
  - [Nota:](#nota)

## Requisitos

- NodeJS
- Manejador de paquetes de su preferencia (Npm o Yarn)
- React 17.01

## Principales paquetes utilizados

- [Axios](https://github.com/axios/axios)
Utilizado para realizar las peticiones HTTP al servidor.
- [React-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
Utilizado para stylizar componentes con el framework de bootstrap.
- [React-hook-form](https://github.com/react-hook-form/react-hook-form)
Utilizado para el manejo de formularios dentro de la aplicación.
- [React-number-format](https://github.com/s-yadav/react-number-format)
Utilizado para manejar campos númericos dentro de la aplicación
- [Redux](https://github.com/reduxjs/redux)
Utilizado para mantener un estado global en la aplicación.
- [Redux-thunk](https://github.com/reduxjs/redux-thunk)
Middleware para escribir código asincrono en la tienda de redux.
- [Material-table](https://github.com/mbrn/material-table)
Componente utilizado para mostrar tablas.
- [Sweetalert2](https://github.com/sweetalert2/sweetalert2)
Utilizado para mostrar mensajes interactivos al usuario
- [yup](https://github.com/jquense/yup)
Paquete utilizado para realizar validaciones en los formularios.

## Instalación

En primer lugar procedemos a clonar el repositorio en nuestro entorno local con el siguiente comando:

> ``git clone https://github.com/alvarogarcia1010/react-data-client``

Ahora procedemos a crear nuestro archivo .env
> ``cp .env.example .env``

Y colocamos nuestras configuraciones necesarias para poder correr la api en nuestro entorno local.

Finalmente instalamos los paquetes necesarios y corremos la aplicación

> ``yarn install``
>
> ``yarn start``

## Nota:
Esta aplicación ha sido realizada con la versión 17.01 de react lanzada el 22/oct/2020, por lo que puede existir falta de compatibilidad dentro de algunos navegadores, en especial con navegadores desactualizados o Safari lo que afectaría su experiencia al utilizar la aplicación.

Por lo que se recomienda evitar utilizar Safari y utilizar un navegador actualizado para asegurar una mejor experiencia al usuario.

Si llegase a experimentar problemas con la aplicación, contactactese al correo [alvarogarcia1010@gmail.com](alvarogarcia1010@gmail.com) para reportar su problema y poder darle el seguimiento correspondiente.