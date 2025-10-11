import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import BackIcon from "../assets/icon/arrow_back.svg";
import Button from "../components/button/Button"; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado (simulación). ¡Enfócate en los estilos!");
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <Header
          title="Registro"
          leftIcon={<img src={BackIcon} alt="Volver" />} // 👈 pequeño ajuste importante
          onLeftClick={() => navigate(-1)}
        />

        <form className="login__form" onSubmit={handleSubmit}>
          <p className="p-small login__error login__error--general">
            Credenciales inválidas. Por favor, revisa tu información.
          </p>

            <div className="login__field">
            <label htmlFor="email" className="login__label">
              Name
            </label>
            <input
              id="name"
              type="name"
              placeholder="Nombre"
              className="login__input"
            />
          </div>

           <div className="login__field">
            <label htmlFor="email" className="login__label">
              SurName
            </label>
            <input
              id="surname"
              type="surname"
              placeholder="Apellido"
              className="login__input"
            />
          </div>

           <div className="login__field">
            <label htmlFor="email" className="login__label">
              DNI
            </label>
            <input
              id="dni"
              type="dni"
              placeholder="DNI / NIE"
              className="login__input"
            />
          </div>

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
            text="Iniciar sesión"
            variant="primary"
            type="submit"
            disabled={false}
          />
        </form>
      </div>
    </div>
  );
};

export default HomePage;
