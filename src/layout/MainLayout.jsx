import Header from "../components/header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
// DEBES importar el Footer aquí para que se renderice en el Layout
import Footer from "../components/footer/Footer"; 

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Estado para el modal de cerrar sesión
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    const infoModalHandler = useRef(null);


    const handleOpenLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const handleCloseLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleConfirmLogout = () => {
        console.log("Cerrando sesión...");
        // Aquí va tu lógica real de logout (limpiar token, etc.)
        handleCloseLogoutModal();
        navigate('/'); // Redirigir a login o welcome page
    };

    const handleRequestInfoModal = (openModalFn) => {
        infoModalHandler.current = openModalFn;
    };

    let leftIcon = null;
    let rightIcon = null;
    let onLeftClick = null;
    let onRightClick = null;
    let title = "Las empanadas en SU PUNTO"; // Título general
    let showHeader = true; // Controla si se muestra el Header/Footer del Layout

    // 🎯 Configuración del Header General (Valores por Defecto)
    // 1. Flecha en la izquierda para volver a /home
    leftIcon = <span className="material-symbols-outlined">arrow_back</span>;
    onLeftClick = () => navigate("/home");

    // 2. Logout en la derecha (Esto es lo que requerías)
    rightIcon = <span className="material-symbols-outlined">logout</span>;
    onRightClick = handleOpenLogoutModal; 


    // Lógica para anular o modificar el Header General según la ruta
    switch (location.pathname) {
        case "/":
        case "/login":
            showHeader = false; // No Header/Footer en login
            break;

        case "/delivery":
            // ¡IMPORTANTE! Ocultamos el Header/Footer del Layout 
            // para que DeliveryPage pueda usar su Header especializado.
            showHeader = false;
            break;

        case "/home":
            // En Home queremos el icono de perfil en lugar de Logout
            // Mantenemos la flecha a Home (por defecto)
            rightIcon = <span className="material-symbols-outlined">person</span>;
            onRightClick = () => navigate("/profile");
            break;

        case "/profile":
            // Mantenemos la flecha a Home y el Logout por defecto
            title = "Fila - Zero";
            break;
    }

    return (
        <>
            {/* ✅ RENDERIZA EL HEADER SOLO SI showHeader ES TRUE */}
            {showHeader && (
                <Header
                    title={title}
                    leftIcon={leftIcon}
                    onLeftClick={onLeftClick}
                    rightIcon={rightIcon}
                    onRightClick={onRightClick}
                />
            )}
            
            {/* ✅ MAIN/CONTENIDO DE LA PÁGINA (Outlet) */}
            <main className="main-content">
                {location.pathname === "/delivery" ? (
                    <Outlet context={{ onRequestInfoModal: handleRequestInfoModal }} />
                ) : (
                    <Outlet />
                )}
            </main>

            {/* ✅ FOOTER (Se muestra si hay Header, asumiendo que lo importaste) */}
            {showHeader && <Footer />} 

            {/* ✅ MODAL DE CERRAR SESIÓN */}
            {isLogoutModalOpen && (
                <div 
                    className="modal is-open" 
                    onClick={handleCloseLogoutModal}
                >
                    <div 
                        className="modal__content" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal__header">
                            <h3 className="modal__title">Cerrar Sesión</h3>
                            <button 
                                className="modal__close-btn" 
                                onClick={handleCloseLogoutModal}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="modal__body">
                            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                                ¿Estás seguro que quieres cerrar sesión?
                            </p>
                            <div style={{ 
                                display: 'flex', 
                                gap: '12px', 
                                justifyContent: 'center' 
                            }}>
                                <button
                                    onClick={handleCloseLogoutModal}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        backgroundColor: '#f5f5f5',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmLogout}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainLayout;