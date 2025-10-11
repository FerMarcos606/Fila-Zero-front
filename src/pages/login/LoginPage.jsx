import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Importar useNavigate
import Header from "../../components/header/Header";
import Button from "../../components/button/Button"; 
import "./LoginPage.css";
// Asegúrate de que esta importación sea correcta
import BackIcon from '../../assets/icon/arrow_back.svg'; 

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
        <Header
          title="Iniciar Sesión"
          // Usamos navigate(-1) para volver a la página anterior, si existe
          leftIcon={<img src={BackIcon} alt="Volver" />} 
          onLeftClick={() => navigate(-1)}
        />

        {/* El formulario llama a handleSubmit */}
        <form className="login__form" onSubmit={handleSubmit}>
          {/* ... campos de email y contraseña ... */}
          
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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

