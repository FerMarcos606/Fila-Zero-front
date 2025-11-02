// AppFooter.jsx - Componente de Footer Reutilizable de Fila-Zero

import React from 'react';
// Importamos Link para navegación SPA y useLocation para resaltar el enlace activo
import { Link, useLocation } from 'react-router-dom'; 
import './Footer.css'; // Usamos los estilos CSS

// 1. Array de Enlaces (FOOTER_LINKS) - Insertado directamente para evitar problemas de importación
const FOOTER_LINKS = [
    {
        id: 1,
        label: 'Inicio',
        icon: 'home',
        href: '/', // Redirige a HomePage
    },
    {
        id: 2,
        label: 'Pedidos',
        icon: 'receipt_long',
        href: '/pedidos', // Redirige a DeliveryPage/OrderPage
    },
    {
        id: 3,
        label: 'Notificaciones',
        icon: 'notifications',
        href: '/notificaciones', // Define la ruta futura
    },
    {
        id: 4,
        label: 'Perfil',
        icon: 'person',
        href: '/perfil', // Redirige a ProfilePage
    },
];

const AppFooter = () => {
    // 2. Obtiene la ruta actual para determinar qué enlace está activo
    const location = useLocation();

    return (
        <footer className="delivery-footer">
            <nav className="delivery-footer__nav">
                {/* 3. Mapea la lista de enlaces para generar los 4 íconos funcionales */}
                {FOOTER_LINKS.map((link) => {
                    
                    // Comprueba si la ruta actual coincide con el href
                    const isActive = location.pathname === link.href;

                    return (
                        // 4. Usa el componente <Link> con la propiedad 'to' para la redirección
                        <Link
                            key={link.id}
                            // Aplica la clase 'nav-item--active' si isActive es true
                            className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
                            to={link.href} // El destino de la navegación
                        >
                            {/* Ícono de Material Symbols */}
                            <span className="material-symbols-outlined">{link.icon}</span>
                            
                            {/* Etiqueta del enlace */}
                            <span className="nav-item__label">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </footer>
    );
};

export default AppFooter;