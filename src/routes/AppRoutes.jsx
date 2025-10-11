import React from "react";
import { Routes, Route } from "react-router-dom"; // Import correcto
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/login/LoginPage";
import Loader from "../pages/Loader";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> 

      {/* Página de carga inicial */}
      <Route path="/loader" element={<Loader />} />

      {/* Página de inicio de sesión (redundante, pero segura) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas que usan el layout principal */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
