/**
 * Define las URLs (endpoints) relacionadas con autenticacion 
 * las conecta con su funcion contraladora correspondiente 
 */

//Framework del servidor 
const express = require('express');
//Router in mini servidor de rutas que despues se montan en server.js 
//con una app.use(api/auth), authRoutes
const router = express.Router();

//Funciones controladas con la logica real de cada endpoint 
