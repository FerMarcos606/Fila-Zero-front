import React from "react";
import { Routes, Route } from "react-router-dom"; // Import correcto
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/login/LoginPage";
import LoaderPage from "../pages/LoaderPage";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
       {/* RUTA RAÍZ */}
     
      <Route path="/" element={<LoaderPage />} /> 

      {/* RUTA DE CARGA (Para consistencia) */}
      <Route path="/loader" element={<LoaderPage />} />

      {/* Página de inicio de sesión */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas que usan el layout principal */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
