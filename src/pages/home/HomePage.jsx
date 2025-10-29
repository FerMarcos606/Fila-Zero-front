import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";
import BtnBack from "../../components/btnback/BtnBack";
import Footer from "../../components/footer/Footer";
import "../../styles/Variables.css";
import "../../styles/Base.css";
import Header from "../../components/header/Header";

const HomePage = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    carne: 0,
    pollo: 0,
    vegetariana: 0,
    cecina: 0,
  });

  const handleQuantityChange = (item, delta) => {
    setOrder((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta),
    }));
  };

  const total = Object.values(order).reduce((a, b) => a + b, 0);
  const totalPrice = total * 2.5; // ejemplo: cada empanada 2,5 €

  const handleCreateOrder = () => {
    if (total === 0) return;
    navigate("/order-summary", { state: { order, totalPrice } });
  };

  return (
    <div className="home">
      {/* === HEADER === */}
      <header className="home__header">
        <div className="home__header-left">
         <BtnBack />


          <h1 className="home__logo">Fila-Zero</h1>
        </div>
        <div className="home__header-right">
          <button
            className="home__login-button"
            onClick={() => navigate("/login")}
          >
            <svg
              className="home__icon-login"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
              1.79-4 4 1.79 4 4 4zm0 2c-2.67 
              0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="home__login-text">Login</span>
          </button>
        </div>
      </header>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="home__content">
        <div className="home__welcome">
          <p className="home__welcome-message">Hola, Sofía</p>
          <h1 className="home__welcome-subtitle">
            ¡Lista para encargar tus empanadas favoritas!
          </h1>
        </div>

        {/* === PEDIDO RÁPIDO === */}
        <section className="home__quick-order">
          {[
            { key: "carne", name: "Empanada de Carne" },
            { key: "pollo", name: "Empanada de Pollo" },
            { key: "vegetariana", name: "Empanada Vegetariana" },
            { key: "cecina", name: "Empanada Cecina y Queso Cabra" },
          ].map((item) => (
            <div key={item.key} className="home__quick-item">
              <span className="home__quick-name">{item.name}</span>
              <div className="home__quantity">
                <button
                  className="home__quantity-btn"
                  onClick={() => handleQuantityChange(item.key, -1)}
                >
                  -
                </button>
                <span className="home__quantity-display">
                  {order[item.key]}
                </span>
                <button
                  className="home__quantity-btn"
                  onClick={() => handleQuantityChange(item.key, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* === TOTAL Y BOTÓN === */}
          <div className="home__summary">
            <div className="home__total">
              <span className="home__total-label">Total:</span>
              <span className="home__total-value">
                {totalPrice.toFixed(2)} €
              </span>
            </div>
            <button
              type="button"
              className="home__btn-primary"
              onClick={handleCreateOrder}
              disabled={total === 0}
            >
              Crear Pedido
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
