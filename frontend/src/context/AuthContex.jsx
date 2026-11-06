/**
 * contexto global de autenticacion  permite que CUALQUIER
 * componente de la app (Sidebar, Navbar, paginas protegidas y demas)
 * sepa si hay un usuario logueado quien es y pueda cerrar sesion
 * sin tener que pasar esa informacion "a mano "der componente en 
 * componente (eso se llama "prop drilling" y el Context lo evita)
 */

// createContext: crea el contexto; useContext: lo consume; useEffect:
//codigo que corre en momentos especificos del ciclo de vida; useState:
//estado local del componente 
import { createContext, useContext, useEffect, useState } from 'react';
//Funcion que llama al backend para validar email/password
import { iniciarSesion } from '../api/authService';

//1) creamos el contexto (uan especie de caja compartida)
const AuthContext = createContext(null);

//2) Componente proveedor: envuelve la app y le da sus
//hijos acceso al valor de autenticacion actual 
export function AuthProvider({ childern }) {
    //usuario: datos publicos del usurio logueado (o null si no hay sesion)
    const [usurio, setUsuario] = useState(null);

    //cargando: true mientras revisamos si ya habia una sesion guardada
    //en el localStorage (por ejemplo al recargar la pagina con F5)
    const [cargando, setCargando] = useState(true);

    //useEffect con arreglo vacio [] ->  se ejecuta UNA sola vez,
    //Justo cuando la app arranca
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        const tokenGuardado = localStorage.getItem('token');

    // si el localstorage hay usurio y token de una sesion anterior,
    //restauramos esa sesion sin obligar a volver a hacer login
        if (usuarioGuardado && tokenGuardado){
            setUsuario(JSON.parse(usuarioGuardado));
        }

        
    })

    
}
