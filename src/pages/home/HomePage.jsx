import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";

import Footer from "../../components/footer/Footer";

// Estructura de las empanadas con precio real
const EMPANADAS_DATA = [
    { key: "carne", name: "Carne", price: 2.50 },
    { key: "pollo", name: "Pollo", price: 2.50 },
    { key: "vegetariana", name: "Vegetariana", price: 2.75 },
    { key: "cecina", name: "Cecina y Queso Cabra", price: 3.00 },
];

const HomePage = () => {
    const navigate = useNavigate();

    // Estado del pedido
    const [order, setOrder] = useState(
        EMPANADAS_DATA.reduce((acc, item) => ({ ...acc, [item.key]: 0 }), {})
    );
    const [isBizumModalOpen, setIsBizumModalOpen] = useState(false);

    const handleQuantityChange = (itemKey, delta) => {
        setOrder((prev) => ({
            ...prev,
            [itemKey]: Math.max(0, prev[itemKey] + delta),
        }));
    };
    
    // ✅ CALCULAR TOTAL CON useMemo o en render
    const totalPrice = EMPANADAS_DATA.reduce((acc, item) => {
        const quantity = order[item.key] || 0;
        return acc + (item.price * quantity);
    }, 0).toFixed(2);
    
    const totalQuantity = Object.values(order).reduce((a, b) => a + b, 0);

    // Abrir modal Bizum
    const handleOpenBizum = () => {
        if (totalQuantity === 0) return;
        setIsBizumModalOpen(true);
    };

    // Cerrar modal
    const handleCloseBizum = () => {
        setIsBizumModalOpen(false);
    };

    // Simulación de enviar pago y navegar a Delivery
    const handleSendBizum = () => {
        setIsBizumModalOpen(false);
        navigate("/delivery", { state: { order, totalPrice } });
    };

    return (
        <div className="home-screen">
            {/* Contenido principal */}
            <main className="home__content">
                <div className="home__welcome">
                    <p className="home__welcome-message">Hola, Sofía</p> 
                    <h2 className="home__welcome-subtitle">
                        ¡Lista para encargar tus empanadas favoritas!
                    </h2>
                </div>

                <section className="home__quick-order">
                    <div className="home__quick-list">
                        {EMPANADAS_DATA.map((item) => (
                            <div key={item.key} className="home__quick-item">
                                <div className="home__item-info">
                                    <p className="home__quick-name">{item.name}</p>
                                    <p className="home__quick-price">
                                        {item.price.toFixed(2)}€
                                    </p>
                                </div>
                                <div className="home__quantity-controls">
                                    <button
                                        className="home__quantity-btn home__quantity-btn--decrement"
                                        onClick={() => handleQuantityChange(item.key, -1)}
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <span className="home__quantity-display">{order[item.key]}</span>
                                    <button
                                        className="home__quantity-btn home__quantity-btn--increment"
                                        onClick={() => handleQuantityChange(item.key, 1)}
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ RESUMEN SIEMPRE VISIBLE */}
                    <div className="home__summary">
                        <div className="home__total">
                            <span className="home__total-label">Total</span>
                            <span className="home__total-value">{totalPrice} €</span>
                        </div>
                        <button
                            type="button"
                            className="home__btn-create-order"
                            onClick={handleOpenBizum}
                            disabled={totalQuantity === 0}
                        >
                            Bizum
                        </button>
                    </div>
                </section>
            </main>

            <Footer />

            {/* ✅ MODAL BIZUM - CLASES RENOMBRADAS */}
{isBizumModalOpen && (
    <div className="bizum-modal-overlay" onClick={handleCloseBizum}>
        <div className="bizum-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bizum-modal-header">
                <span
                    className="material-symbols-outlined bizum-modal-close-icon"
                    onClick={handleCloseBizum}
                >
                    close
                </span>
                <h3>Simulación Bizum</h3>
            </div>
            <div className="bizum-modal-body">
                <p><strong>Teléfono:</strong> 600123456</p>
                <p><strong>Subtotal:</strong> {totalPrice} €</p>
            </div>
            <div className="bizum-modal-footer">
                <button 
                    className="home__btn-create-order" 
                    onClick={handleSendBizum}
                    type="button"
                >
                    Enviar
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default HomePage;