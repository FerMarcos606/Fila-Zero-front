import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css'; 

const FOOTER_LINKS = [
    { id: 1, label: 'Inicio', icon: 'home', href: '/home', type: 'link' },
    { id: 2, label: 'Pedidos', icon: 'receipt_long', href: '/delivery', type: 'link' },
    { id: 3, label: 'Perfil', icon: 'person', href: '/profile', type: 'link' },
    { id: 4, label: 'Notificaciones', icon: 'notifications', href: '', type: 'modal' },
];

const AppFooter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLinkClick = (link) => {
        if (link.type === 'link') {
            navigate(link.href);
        } else if (link.type === 'modal') {
            setShowNotifications(true);
        }
    };

    return (
        <>
        <footer className="mobile-nav-bar">
            {FOOTER_LINKS.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                    <div
                        key={link.id}
                        className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
                        onClick={() => handleLinkClick(link)}
                    >
                        <span className="material-symbols-outlined nav-item-icon">{link.icon}</span>
                        <span className="nav-item-label">{link.label}</span>
                    </div>
                );
            })}
        </footer>

        {showNotifications && (
    <div className="notifications-modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000
    }}> 
    {/* ¡Estilos inline sólo para presentación! */}
        <div className="notifications-modal-content" style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            width: '90%',
            maxWidth: '360px',
            position: 'relative',
            textAlign: 'center',
            boxSizing: 'border-box'
        }}>
            <button 
                className="notifications-modal-close-btn"
                onClick={() => setShowNotifications(false)}
                aria-label="Cerrar notificaciones"
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#666'
                }}
            >
                ← Volver
            </button>
            <h3>Última Notificación</h3>
            <p>Tienes un nuevo pedido listo para recoger.</p>
        </div>
    </div>
)}

        {/* Modal de Notificaciones
        {showNotifications && (
            <div className="notifications-modal-overlay">
                <div className="modal-content">
                    <button 
                        className="modal-close-btn"
                        onClick={() => setShowNotifications(false)}
                        aria-label="Cerrar notificaciones"
                    >
                        ← Volver
                    </button>
                    <h3>Última Notificación</h3>
                    <p>Tienes un nuevo pedido listo para recoger.</p>
                </div>
            </div>
        // )} */}
        </>
    );
};

export default AppFooter;
