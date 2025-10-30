import Header from "../components/header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BtnBack from "../components/btnback/BtnBack";
import React from "react";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let leftIcon = null;
  let rightIcon = null;
  let onLeftClick = null;
  let onRightClick = null;
  let title = "Las empanadas en SU PUNTO";

  if (location.pathname === "/home") {
    rightIcon = <span className="material-symbols-outlined">person</span>;
    onRightClick = () => navigate("/profile");
  } else if (location.pathname === "/profile") {
    leftIcon = <BtnBack />;
    onLeftClick = () => navigate("/home");
    title = "Mi perfil";
  }

  return (
    <>
      <Header
        title={title}
        leftIcon={leftIcon}
        onLeftClick={onLeftClick}
        rightIcon={rightIcon}
        onRightClick={onRightClick}
      />
      <Outlet /> {/* HomePage se renderiza aquí, incluyendo su footer */}
    </>
  );
};

export default MainLayout;
