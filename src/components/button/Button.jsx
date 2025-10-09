import React from "react";
import './Button.css'

const Button = ({ text = "Buscar", variant = "primary", onClick }) => {
    return (
      // Usamos 'btn' como clase base y la variante de estilo
      <button
        className={`btn btn-${variant}`} onClick={onClick}
      >
        {text}
      </button>
    )
  }
  
export default Button