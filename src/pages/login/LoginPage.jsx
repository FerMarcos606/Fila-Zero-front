import React from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/header/Header";
import Button from "../../components/button/Button"; 
import "./LoginPage.css";


const LoginPage = () => {
  // 2. Inicializar el hook
  const navigate = useNavigate();

  // 3. Función de manejo de envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí iría tu lógica real de autenticación.
    // Por ahora, simulamos el éxito y navegamos a /home.
    console.log("Simulando login exitoso. Navegando a /home.");
    
    // 4. USAR EL HOOK PARA NAVEGAR A LA RUTA DESEADA
    navigate("/home"); 
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/*
          NOTA: Si tu componente <Header /> ya maneja el título principal
          y quieres que el nuevo texto esté debajo, lo quitamos de <Header />
          y lo ponemos con etiquetas <h1> y <p> o <h2>.
        */}

        {/* --- 1. Título y Subtítulo (Agregados aquí) --- */}
        <h1 className="login__title">Iniciar sesión</h1>
        <p className="login__subtitle">
            ¡Bienvenido a **Fila-Zero**! ¡Tus Empanadas recién horneadas!
        </p>

        {/* El formulario llama a handleSubmit */}
        <form className="login__form" onSubmit={handleSubmit}>
          
          <div className="login__field">
            <label htmlFor="email" className="login__label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tunombre@gmail.com"
              className="login__input"
            />
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              className="login__input"
            />
          </div>

          <Button
            text="Iniciar sesión"
            variant="primary"
            type="submit" // Es crucial que el type sea submit para que se ejecute handleSubmit
            disabled={false}
          />

          {/* --- 2. Enlace de Registro (Agregado aquí) --- */}
          <div className="login__register-link">
            ¿No tienes una cuenta? 
            {/* Asumo que la ruta de registro es /register o /registro */}
            <span 
                onClick={() => navigate("/registration")} 
                className="login__register-text"
            >
                ¡Regístrate!
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;