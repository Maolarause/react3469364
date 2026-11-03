/**
 * Aqui vive la logica de negocio del login recibir email 
 * y contraseña, buscar el usuario en mysql, comparar la contraseña
 * encriptada y devolver un token JWT si todo es correcto
 * las rutas (auth.routes.js)solo dicen cuando llegue tal data
 * peticion, llama a esta funcion la logica en si va aca (CRUD)
 */

// Libreria para encriptar y comparar la contraseña
const bcrypt = require('bcryptjs');
//Libreria para crear (firmar) tokens JWT se sesion
const jwt = require('jsonwebtoken');
//pool para conexiones mysql condigurado en config/db.js
const pool = require('../config/db');
//Carga  las variables de .env (JWT_SECRET, JWT_EXPIRES_IN )
require('dotenv').config();

// post /api/auth/login
//Recibe {email, password} y devuelve {token, usuario}si son correctos
async function login(req, res) {
    try {
    //Extraemos el email y password de cuerpo (body) de la petcion,
    // que express.json() ya convirtio de JSON a objeto de javascript
    const { email, password }= req.body;

    // 1 vaidacion basica que no llegue al fomulario vacio
    if (!email || !password) {
        return res.status(400).json({mensaje: 'El correo y la contraseña son obligatorios'});
    }

    //2 buscar el ususario por email en la tabla usuarios
    //usamos "?" en la consulta (no contatenamos el email directo)
    //para evitar inyeccion SQl; mysql2 se encarga de escaparlo
    const [filas] = await pool.query(
        'SELECT id, nombre, email, password,rol, estado FROM usuarios WHERE email = ? LIMIT 1', [email]
    );

    //Si no encontro  ninguna fila, el correo no existe 
    if (filas.length === 0) {
        return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    //pool.query con SELECT siempre devuelve un arreglo de filas; como 
    // buscamos por email (unico ), nos quedanos con la primera fila y unica fila
    const usuario = filas[0];

    // si el usurio fue desactivado no dejamos iniciar sesion 
    //aunque la contraseña sea correcta 
    if (usuario.estado === 0) {
        return res.status(403).JSON({ message: 'Este usuario esta desactivado. contacte al administrador '});
    }

    /**
     * comparar la contraseña que envio el formulario con el hash 
     * guardado en la base de datos bcrypt.compare vuelve a aplicar
     * el mismo algoritmo y revisa si el resultado coincide la 
     * contraseña original nunca se puede desencriptar 
     */
    const passwordCorrecta = await bcrypt.compare (password, usuario.password);

    if (!passwordCorrecta) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos'}); 

    }
    /**
     * generar el token JWT que el frontend guardara para 
     * demostrar , en cada peticion futura que ya inicio sesion 
     */
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol },// datos dentro del token
        process.env.JWT_SECRET, //firma secreta
        { expiresIn: process.env.JWT_EXPIRES_IN || '8h'} //tiempo de vida del token 
    );

    /**
     * Responder token con los datos publicos del usuario
     * NUNCA se devuelve el hash de la contraseña al frontend
     */
    return res.json({
        token,
        usuario: {
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
        },
    });
} catch (error) {
    //Cualquier error inesperado (por ejemplo en mysql este pagado )
    //cae aqui en vez de tumbar el servidor 
    console.error('Error en login:', error );
    return res.status(500).json({mensaje: 'Error del servidor al iniciar sesion '});
}
}

//GET/api/auth/perfil
//Ruta protegida de ejemplo solo responde a personas si el middleware 
//verificarToken confirmo q el token es valido 
async function perfil(req, res) {
    //Req.usuario fue puesto por el middleware verificarToken
    return res.json({ usuario: req.usuario });
}

//Exportamos ambas funciones para authroutes.js pueda conectarlas
//con las urls correspondientes
module.exports = { login, perfil };


