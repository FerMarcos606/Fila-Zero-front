// src/components/Header/Header.jsx
import React from "react";
import "./Header.css";


const Header = ({ 
    title = "Las empandas en SU PUNTO", // <-- ÚNICA FUENTE DE TÍTULO (valor por defecto)
    subtitle, // nuevo subtítulo opcional
    leftIcon, 
    rightIcon, 
    onLeftClick, 
    onRightClick,
}) => {
    
    return (
        <header className="app-header">
            
            {/* LADO IZQUIERDO (Icono de Volver) */}
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

            {/* CENTRO: El texto renderizado es la prop 'title' */}
            <div className="header__center">
                <h3 className="header__title">{title}</h3>
                {subtitle && <p className="header__subtitle">{subtitle}</p>}
            </div>

            {/* LADO DERECHO (Icono de Perfil/Acción) */}
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