// src/components/Header/Header.jsx
import React from "react";
import "./Header.css";

const Header = ({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) => {
  return (
    <header className="app-header">
      <div className="app-header-left">
        {leftIcon && (
          <button
            className="header-icon-button"
            onClick={onLeftClick}
            aria-label="Volver"
          >
            {leftIcon}
          </button>
        )}
      </div>

      <h1 className="app-header-title">{title}</h1>

      <div className="app-header-right">
        {rightIcon && (
          <button
            className="header-icon-button"
            onClick={onRightClick}
            aria-label="Acción"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
