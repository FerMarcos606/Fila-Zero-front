import React from "react";
import './Button.css'

// const Button = ({ text = "Buscar", variant = "primary", onClick }) => {
//     return (
//       // Usamos 'btn' como clase base y la variante de estilo
//       <button
//         className={`btn btn-${variant}`} onClick={onClick}
//       >
//         {text}
//       </button>
//     )
//   }
  
// export default Button

// 💡 Si usas 'variant' en lugar de 'type' en el JSX, ¡corrige esto!
const Button = ({ text = "Acceder", variant = "primary", onClick, disabled, type }) => {
    
    // Si estás usando la convención que te sugerí:
    const classNames = `btn btn-${variant}`; 

    return (
        <button
            className={classNames}
            onClick={onClick}
            disabled={disabled}
            type={type || "button"} // Aseguramos que tenga un tipo
        >
            {text}
        </button>
    );
}
export default Button;