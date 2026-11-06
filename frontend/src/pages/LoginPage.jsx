/**
 * Panatalla login funcional
 * 
 * Pantalla publica de inicio de sesion Es la unica parte del 
 * sistema que habla con la base de datos MYSQL real a travez del 
 * backend Node/Express si las credenciales son correctas 
 * redirije al usurio al dashboard
 */

//Hook del estado local para los campos del formulario
import { useState } from 'react';
//Hook para redirigir por codigo despues de iniciar sesion
import { useNavigate } from 'react-router-dom';
//Hook para llamar a login() del contexto global de sesion
import { useAuth } from '../context/AuthContex';

//no recibe props es el element de la ruta publica / login en App.jsx
function LoginPage() {
    //Traemos solo la funcion login() del contexto no se necesita mas 
    const { login } = useAuth();
    //Funcion para cambiar la url una vez el login sea exitoso
    const navigate = useNavigate();

    //estado del formulario controlado
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Estado para mostrar el error que devuelva el backend credenciales
    //invalidas, usuario desactivado servidor caido o demas
    const [error, setError] = useState('');

    //estado para deshabilitar el boton mientras espera la respuesta
    //del servidor y evitar que elñ usuario haga doble clic
    const [enviado, setEnviando] = useState(false);

    //Se ejecuta cuando el usuario envia el formulario boton o enter
    async function manejarEnvio(evento) {
        evento.preventDefault(); //evita que el navergador recargue la pagina
        setError('');//limpia cualquier error de un inteno anterior 
        setEnviando(true);// deshabilita el boton mientras esperamos la respuesta

        try {
            //login() esta definido en AuthContext: llama al backend
            //Guarda el token/usuario y actualiza el estado global
            await login(email, password);

            //si no lanzo error, las credenciales fueron correctas
            navigate('/dashboard', { replace:true });
        } catch (err) {
            //si el backend respondio un mensaje error (401, 403 ...)
            //axios lo deja disponible en err.response.data.mensaje
            const mensajeBackend = err?.response?.data?.mensaje;
            setError(mensajeBackend || 'No se pudo conectar con el servior. Verifica que el backend este corriendo');
        } finally {
            //finally se ejecuta Siempre (haya exito o error ) reactivamos el boton
            setEnviando(false);
        }
    }
}