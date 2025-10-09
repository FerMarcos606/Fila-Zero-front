import React from "react";

import "./Loader.css";

const Loader = () => {

    return (
        <main className="main">
            {/*Section loader*/}
            <section className="main_loader">
                <div className="main_loader_loadingPie">
                    <div className="main_loader_logo">
                        <p className="main_loader_logo-text">Fila-Zero</p>
                    </div>
                    <div className="main_loading-content ">
                        <p className="main_loading-text">Cargando tus empanadas...</p>
                    </div>
                </div>

            </section>
        </main>
    )

}

export default Loader;