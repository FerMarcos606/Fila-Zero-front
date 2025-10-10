import React from "react";
import empanadaIcon from '../assets/imgs/empanada.svg';

import "./Loader.css";

const Loader = () => {

    return (
        <main className="main">
            {/*Section loader*/}
            <section className="main_loader">
                    <div className="main_spinner">
                        {/* Este div container spinner and logo, 
                            one over the other */ }
                        <div className="spinner-container"> 
                            {/* circle without logo */}
                            <div className="main_loader_loadingPie">
                            {/* Spinner fade */}
                            </div>
                            
                            {/* Logo must be fixed over spinner*/}
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

export default Loader;