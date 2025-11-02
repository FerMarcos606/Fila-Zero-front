import React, { useState } from "react";
import "./Header.css";
import LogoutIconSVG from "../../assets/icon/logout.svg";
import { useNavigate } from "react-router-dom";

const Header = ({ title, leftIcon, rightIcon, onLeftClick,onRightClick }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    console.log("🔘 Logout icon clicked");
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/login"); // o tu ruta inicial
  };

  return (
    <>
      <header className="app-header">
        <div className="app-header-left" onClick={onLeftClick}>
          {leftIcon}
        </div>

        <h1 className="app-header-title">{title}</h1>

        <div className="app-header-right">
          {rightIcon ? (
            <button
              className="header-icon-button"
              onClick={onRightClick}
              aria-label="Acción derecha"
            >
              {rightIcon}
            </button>
          ) : (
            // <button
            //   className="header-icon-button"
            //   onClick={handleLogoutClick}
            //   aria-label="Cerrar sesión"
            // >
            //   <img src={LogoutIconSVG} alt="logout" />
            // </button>

              )}
        </div>
      </header>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={handleCancelLogout}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
          >
            <span className="material-symbols-outlined modal-icon">logout</span>
            <h2>¿Estás seguro que quieres cerrar sesión?</h2>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCancelLogout}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={handleConfirmLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
