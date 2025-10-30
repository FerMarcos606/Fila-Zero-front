import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";

// Importaciones de componentes
import BtnBack from "../../components/btnback/BtnBack"; 
import Header from "../../components/header/Header";

// Importaciones de estilos se mantienen
import "../../styles/Variables.css";
import "../../styles/Base.css";

// Estructura de las empanadas con precio real
const EMPANADAS_DATA = [
    { key: "carne", name: "Carne", price: 2.50 },
    { key: "pollo", name: "Pollo", price: 2.50 },
    { key: "vegetariana", name: "Vegetariana", price: 2.75 },
    { key: "cecina", name: "Cecina y Queso Cabra", price: 3.00 },
];

const HomePage = () => {
    const navigate = useNavigate();

    // Lógica de estado y cálculo de totales
    const [order, setOrder] = useState(
        EMPANADAS_DATA.reduce((acc, item) => ({ ...acc, [item.key]: 0 }), {})
    );

    const handleQuantityChange = (itemKey, delta) => {
        setOrder((prev) => ({
            ...prev,
            [itemKey]: Math.max(0, prev[itemKey] + delta),
        }));
    };
    
    const totalPrice = EMPANADAS_DATA.reduce((acc, item) => {
        const quantity = order[item.key] || 0;
        return acc + (item.price * quantity);
    }, 0).toFixed(2);
    
    const totalQuantity = Object.values(order).reduce((a, b) => a + b, 0);

    const handleCreateOrder = () => {
        if (totalQuantity === 0) return;
        navigate("/order-summary", { state: { order, totalPrice } });
    };

    // FUNCIÓN DE NAVEGACIÓN PARA EL FOOTER
    const handleNavigate = (path) => {
        navigate(path);
    };

    

    // --- PROPS PARA EL HEADER ---
    // 1. Icono Izquierdo
    const LeftIconComponent = <BtnBack />; 
    
    // 2. Icono Derecho
    const RightIconComponent = (
        <span className="material-symbols-outlined home__profile-icon">person</span>
    );
    
    // NOTA: Se eliminó la variable PageTitle y su uso en el <Header>

    return (
        <div className="home-screen"> 
           

            {/* === CONTENIDO PRINCIPAL === */}
            <main className="home__content">
                
                {/* Saludo y Título */}
                <div className="home__welcome">
                    <p className="home__welcome-message">Hola, Sofía</p> 
                    <h2 className="home__welcome-subtitle">
                        ¡Lista para encargar tus empanadas favoritas!
                    </h2>
                </div>

                {/* Sección de Pedido Rápido (Lista de Items) */}
                <section className="home__quick-order">
                    
                    {/* Mapeo de Items de Empanadas */}
                    <div className="home__quick-list">
                        {EMPANADAS_DATA.map((item) => (
                           <div key={item.key} className="home__quick-item">
                                {/* Información del Item */}
                                <div className="home__item-info">
                                    <p className="home__quick-name">{item.name}</p>
                                    <p className="home__quick-price">
                                        {item.price.toFixed(2)}€
                                    </p>
                                </div>
                                {/* Controles de Cantidad */}
                                <div className="home__quantity-controls">
                                    <button
                                        className="home__quantity-btn home__quantity-btn--decrement"
                                        onClick={() => handleQuantityChange(item.key, -1)}
                                    >-</button>
                                    <span className="home__quantity-display">
                                        {order[item.key]}
                                    </span>
                                    <button
                                        className="home__quantity-btn home__quantity-btn--increment"
                                        onClick={() => handleQuantityChange(item.key, 1)}
                                    >+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* === RESUMEN Y BOTÓN CREAR PEDIDO === */}
                    <div className="home__summary">
                        <div className="home__total">
                            <span className="home__total-label">Total</span>
                            <span className="home__total-value">
                                {totalPrice} €
                            </span>
                        </div>
                        <button
                            type="button"
                            className="home__btn-create-order"
                            onClick={handleCreateOrder}
                            disabled={totalQuantity === 0}
                        >
                            Crear Pedido
                        </button>
                    </div>
                </section>
            </main>
            
            {/* === FOOTER/NAVEGACIÓN MÓVIL (Fijo) - BLOQUE SOLICITADO === */}
            <footer className="home__footer">
                <nav className="home__nav-mobile">
                    
                    {/* Ítem Home (Activo) */}
                    <a className="home__nav-item home__nav-item--active" onClick={() => handleNavigate("/home")}>
                        <span className="material-symbols-outlined home__nav-icon"> home </span>
                        <span className="home__nav-label">Home</span>
                    </a>
                    
                    {/* Ítem Pedidos */}
                    <a className="home__nav-item" onClick={() => handleNavigate("/orders")}>
                        <span className="material-symbols-outlined home__nav-icon"> receipt_long </span>
                        <span className="home__nav-label">Pedidos</span>
                    </a>
                    
                    {/* Ítem Notificaciones */}
                    <a className="home__nav-item" onClick={() => handleNavigate("/notifications")}>
                        <span className="material-symbols-outlined home__nav-icon"> notifications </span>
                        <span className="home__nav-label">Notificaciones</span>
                    </a>
                    
                    {/* Ítem Perfil */}
                    <a className="home__nav-item" onClick={() => handleNavigate("/profile")}>
                        <span className="material-symbols-outlined home__nav-icon"> person </span>
                        <span className="home__nav-label">Perfil</span>
                    </a>
                </nav>
            </footer>
            
        </div>
    );
};


export default HomePage;