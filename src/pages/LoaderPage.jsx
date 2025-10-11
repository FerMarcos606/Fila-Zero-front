import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import empanadaIcon from '../assets/imgs/empanada.svg';

import "./LoaderPage.css";

const LoaderPage = () => {
    // 💡 Lógica para redirigir automáticamente después de 3 segundos
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login"); 
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);
    
    return (
        <main className="main">
            {/*Section loader*/}
            <section className="main_loader">
                <div className="main_spinner">
                    <div className="spinner-container"> 
                        <div className="main_loader_loadingPie">
                        </div>
                        
                        <div className="main_loader_logo">
                            <img src={empanadaIcon} alt="icono círculo en fondo blanco con borde amarillo" />
                            <p className="main_loader_logo-text">Fila-Zero</p>
                        </div>
                    </div>
                    <div className="main_loading-content ">
                        <h2 className="main_loading-text">Cargando tus empanadas...</h2>
                    </div>
                </div>
            </section>
        </main>
    )

}


export default LoaderPage; 