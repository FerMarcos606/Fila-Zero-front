import React from "react";
import { useNavigate } from "react-router-dom";

const BtnBack = () => {
  const navigate = useNavigate();

  return (
    <button
      className="header-icon-button back-button"
      aria-label="Volver atrás"
      onClick={() => navigate(-1)} // vuelve a la página anterior
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
};

export default BtnBack;
