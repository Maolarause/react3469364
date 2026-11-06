5 empaquetador optimisa y junta todo el css en un solo archivo al hacer `npm run build`
6 intalar las dependecias del backkend t frontend al tiempo `npm run install:all`
7 ingresara  la carpeta backend `npm init -y`
8 intalar dependecias
8.1 `npm install express mysql2 bcryptjs jsonwebtoken cors dotenv`
8.2 crea .env dentro de backend para las variables de entorno
8.3 crea src/config/db.js conexion con DB
8.4 crea src/middlewares/verificarToken.js valida el token  JWT en rutas protegidas
8.5 crea src/controllers/auth.controller.js es la logica de inicio de sesion 
8.6  crea src/routes/auth.routes.js conecta las rutas con el controlodor 
8.7 crea src/server.js arma la app de express
8.8 crea en backend seed.js crea el usuario adminsitrador 
9 crear las siguientes carpetas en frontend
9.1 src/api/axiosClient.js
9.2 src/api/authService.js
9.3 src/context/AuthContext.jsx
9.4 src/page/LoginPage.jsx
