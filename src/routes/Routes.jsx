  import React from "react";
  import {Routes, Route, Router} from 'react-router-dom';
  import LoginPage from "../pages/Loader";
  import loader from 
  
  
  
  export default function AppRoutes () {
    
        return (
            <Router>
            <Routes>
                {/* Define la ruta para la página que usa el Button */}
                <Route path="/login" element={<LoginPage />} />
                
                {/*Spinner Page */}
                <Route path="/loader" element={<Loader />} />
                
                {/* Puedes añadir más rutas aquí */}
                {/* <Route path="/loader" element={<Loader />} /> */}

            </Routes>
            </Router>
            
        );
}

