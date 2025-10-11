// src/layout/MainLayout.jsx (VERSIÓN CORRECTA)

import Header from "../components/header/Header"; 
import Footer from "../components/footer/Footer"; 
import { Outlet } from "react-router-dom"; 

export default function MainLayout() {
  return (
    <div className="page-wrapper">
      <Header />   
      <main className="main-content">
        <Outlet /> 
      </main>
      <Footer />      
    </div>
   
  );
}