  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import MainLayout from "../layout/MainLayout";
  import LoginPage from "../pages/login/LoginPage";
  import Loader from "../pages/Loader";
  import HomePage from "../pages/HomePage";
  
  
  
  export default function AppRoutes () {
    
        return (
            <Router>
      <Routes>

        {/* Página de carga inicial */}
        <Route path="/loader" element={<Loader />} />

        {/* Página de inicio de sesión */}
        <Route path="/login" element={<LoginPage />} />

        {/* 
          Rutas que usan el layout principal (con Header + Footer)
          Estas solo se renderizan una vez que la persona usuaria está dentro de la app.
        */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          {/* Podés agregar más, ej: pedidos, perfil, etc. */}
            </Route>
        </Routes>
        </Router>
    );
    }
    

