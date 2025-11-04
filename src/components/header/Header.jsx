import React, { useState } from "react";
import "./Header.css";

const Header = ({ title, leftIcon, rightIcon, secondRightIcon, onLeftClick, onRightClick, onSecondRightClick }) => {
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
    window.location.href = "https://tusitioexterno.com";
  };

  return (
    <>
      <header className="app-header">
        <div className="app-header-left" onClick={onLeftClick}>
          {leftIcon}
        </div>

        <h1 className="app-header-title">{title}</h1>

        <div className="app-header-right">
          {/* PRIMER ICONO DERECHA */}
          {rightIcon && (
            <button
              className="header-icon-button"
              onClick={onRightClick}
              aria-label="Acción derecha"
            >
              {rightIcon}
            </button>
          )}
          
          {/* SEGUNDO ICONO DERECHA (LOGOUT) */}
          {secondRightIcon && (
            <button
              className="header-icon-button"
              onClick={onSecondRightClick || handleLogoutClick}
              aria-label="Logout"
              style={{ marginLeft: '8px' }}
            >
              {secondRightIcon}
            </button>
          )}
        </div>
      </header>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={handleCancelLogout}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-outlined modal-icon">logout</span>
            <h2>¿Estás seguro que quieres cerrar sesión?</h2>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCancelLogout}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={handleConfirmLogout}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;