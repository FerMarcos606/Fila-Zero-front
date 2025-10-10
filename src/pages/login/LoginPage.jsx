// src/pages/LoginPage/LoginPage.jsx

import React from 'react';
// import { Link } from 'react-router-dom'; 
import Button from '../../components/button/Button'; 
import './LoginPage.css'; 


const LoginPage = () => {
 
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Formulario enviado (simulación). ¡Enfócate en los estilos!");
  };

  

  return (
    <div className="login-page"> 
      <div className="login-container"> 
        
        <h1 className="login__title">Iniciar sesión</h1> 

        
        <form className="login__form" onSubmit={handleSubmit}>
          
          
          <p className="p-small login__error login__error--general">
            Credenciales inválidas. Por favor, revisa tu información.
          </p>

         
          <div className="login__field">
            <label htmlFor="email" className="login__label"> 
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="tunombre@gmail.com"
              
              className="login__input"
            />
           
          </div>
          
          
          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="**********"
             
              className="login__input login__input--error" 
            />
            
            <p className="login__error">La contraseña es obligatoria.</p>
          </div>

          
          <Button
            text={'Iniciar sesión'} 
            variant="primary"
            type="submit" 
            // 💡 Puedes poner disabled={true} para ver el estilo deshabilitado
            disabled={false} 
           
          />
          
        </form>

        {/* Link Register
        <p className="p-small login-link-container">
          ¿No tienes cuenta? 
          <Link to="/register" className="btn-link"> 
            Regístrate aquí
          </Link>
        </p> */}

      </div>
    </div>
  );
};

export default LoginPage;