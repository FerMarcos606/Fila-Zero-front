import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa tus componentes genéricos
import { NavLink } from "react-router-dom";
import Button from "../../components/button/Button"; 
// Importa el modal de edición específico (que haremos después)
import GenericModal from '../../components/modal/GenericModal'; 
import "./ProfilePage.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    
    // Estado para gestionar los datos del usuario (debería venir de un contexto global o API)
   const [userData, _setUserData] = useState({ /* ... */ });
    //     name: 'Sofía',
    //     firstSurname: 'García',
    //     secondSurname: 'López',
    //     dni: '12345678A',
    //     email: 'sofia.garcia@email.com',
    //     phoneNumber: '+34 678 123 456',
    // });

    // Estado para controlar la visibilidad del modal de edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    // Estado para controlar la visibilidad del modal de confirmación de logout
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        // Aquí iría la lógica para invalidar el token (TokenService.js en tu Fila-Zero)
        console.log('Cerrando sesión...');
        setIsLogoutModalOpen(false);
        navigate('/login'); // Redirigir al login
    };

    return (
        // profile-screen -> .profile
        <div className="profile"> 

            {/*  Header (app-header -> app-header) */}
            <header className="app-header">
                {/* Asumo que este es el componente actual, no el de perfil */}
                <h1 className="app-header__title">Perfil</h1> 
                {/* Puedes añadir la flecha de regreso aquí si es necesario: */}
                {/* <button className="app-header__icon-button" onClick={() => navigate(-1)}>...</button> */}
            </header>

            {/*(profile-content -> profile__content) */}
            <main className="profile__content">
                
                {/* (user-data-section -> profile__data-section) */}
                <section className="profile__data-section">
                    <h2 className="profile__section-title">Información Personal</h2>
                    
                    {Object.entries(userData).map(([key, value]) => (
                        <div key={key} className="profile__data-item">
                            <span className="profile__data-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="profile__data-value">{value}</span>
                        </div>
                    ))}
                    
                </section>

                {/*Btn (profile-actions -> profile__actions) */}
                <div className="profile__actions">
                    {/* Btn edit Profile */}
                    <Button 
                        text="Editar perfil" 
                        variant="primary" 
                        onClick={() => setIsEditModalOpen(true)} 
                    />
                    
                    {/* Btn close session */}
                    <Button 
                        text="Cerrar sesión" 
                        variant="secondary" 
                        onClick={() => setIsLogoutModalOpen(true)}
                    />
                </div>
            </main>

            {/* E: Componente de navegación inferior */}
            {/* <MobileNavBar activeItem="Perfil" />  */}
            
            {/* ---------------------------------------------------- */}
            {/* RENDERIZADO CONDICIONAL DE LOS MODALES */}
            {/* ---------------------------------------------------- */}

            {/* Modal de Edición (Bottom Sheet) */}
            {isEditModalOpen && (
                <ProfileEditModal 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                    initialData={userData}
                    // onSave={handleSaveProfile}
                />
            )}

            {/* Modal generic*/}
            {isLogoutModalOpen && (
                <GenericModal 
                    isOpen={isLogoutModalOpen} 
                    onClose={() => setIsLogoutModalOpen(false)}
                    title="Cerrar Sesión"
                    // ... props para el contenido del modal
                >
                    <p>¿Estás seguro que quieres cerrar sesión?</p>
                    <div className="modal__actions">
                        <Button text="Cancelar" variant="secondary" onClick={() => setIsLogoutModalOpen(false)} />
                        <Button text="Cerrar Sesión" variant="danger" onClick={handleLogout} />
                    </div>
                </GenericModal>
            )}

        </div>
    );
};

export default ProfilePage;