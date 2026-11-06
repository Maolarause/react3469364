/**
 * Punto de entrada del backend aqui se crea la aplicacion de Express se configuran los middleware  globales (cors, json) 
 * y se montan las rutas al final el servidor qu esta escuchando 
 * peticiones por el puerto difinido el .env (por defecto el 4000)
 */

//Framework para crear en servidor HTTP y definir rutas
const express = require ('express');
//middleware que habilita CORS (Peticiones desde otro origen/o puerto) 
const cors = require ('cors');
//lee el archivo .env y carga susvalores en process.env
require('dotenv').config();
//Importamos  el router con los enhpoints de autenticacion (login y pefil)
const authRoutes = require('./routes/auth.routes');
//Creamos la aplicacion express 
const app= express();
// cors() permite que el frontend (que corre en otro puerto )
//pueda hacer peticiones a es backend sin que el navegador lo bloquee
app.use(cors());

// express.json() le enseña a express a leer el body  de las peticiones 
//Cuando viene en formato json asi podemos leer req.body.email, etc
app.use(express.json());

//ruta de salud simple, util para probar que el servidor esta vivo 
app.get('/', (req, res ) => {
    res.json({ mensaje: 'Api de inventario react funcionando correctamente'});
});

//todas las rutas que empicen con api/auth se resuelven en authroutes.js
app.use('/api/auth', authRoutes);

//middleware para rutas que no existen (404)
app.use((req, res) => {
    res.status(404).json({ mensaje: 'ruta no encontrada'});
});

// Tomamosn el puerto desde .env o 4000 si no esta definido
const PORT = process.env.PORT || 4000;

//arranca el servidor apartir de aqui Express queda escuchando 
//peticiones HTTP en le puerto indicado hasta que se detenga el proceso 
app.listen(PORT, () => {
    //este callback se ejecuta una vez cuando el servidor este listo 
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
})
