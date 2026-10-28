// Ayuda a detectar errores comunes en el desarrollo
import { StrictMode } from 'react'
// es la funcion moderna de React 18+ para montar la aplicacion en dom
import { createRoot } from 'react-dom/client'
// habilita el manejo de las rutas basaso en la url del navegador
import { BrowserRouter } from 'react-router-dom';

// Estilos de bootstrap clases como btn, container, table y demas
import 'bootstrap/dist/css/bootstrap.min.css';
// Iconos de bootstrap clases como bi bi-trash
import 'bootstrap-icons/font/bootstrap-icons.css';
//javascript de bootstrap necesario para que funcionen los modales
//dropdowns y el menu de navegacion responsive
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Estilos propios del proyecto se cargan solos despues del bootsatrap
//Describe detalles puntuales de la aplicacion 
import './index.css'

// Componente raiz con todas las rutas de la aplicacion 
import App from './App.jsx'

// proveedor del contexto de sesion (ver context/AuthContext.jsx)
import { AuthProvider } from './context/AuthContext.jsx'

//busca el <div id="root"> de index.html y engancha react ahi dentro 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*BrowserRouter habilita la nevegacion por url(react-roter-dom)
    */}
    <BrowserRouter>
    {/*AuthProvider comparte con toda la aplicacion quien es usurio logueado*/}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
