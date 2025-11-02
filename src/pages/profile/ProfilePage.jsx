// src/pages/profile/ProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericModal from "../../components/modal/GenericModal";
import "./ProfilePage.css";

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h56A8,8,0,0,1,168,128Z"></path>
  </svg>
);

const ProfilePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userData] = useState({
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHfP-xaT45kIoCmxtNUrjRNRpbpk0Y8cvvuf55jxySXQT0b46ORG5MA4H7tAq9fMYXiWnWzLbsxBRwQboBCRGe2RGart0jAjmxr_oVJKOmly7B7uYZ1HVlmSfAy9co-kMcadpjQcFUHck86qPSZQVXDHwiJy8Ir3jRkxxxUibTQXiUn611HQTa7eMBqceBkEtzgiiiYtwF2cbpTvjvTjDr0qbr9Vo5tYwZq2mmvy-ne9Ey9qeuLalWdluUY-EjLhH5oGHuP4BMODLQ",
    name: "Sofía",
    firstSurname: "García",
    secondSurname: "López",
    dni: "12345678A",
    email: "sofia.garcia@email.com",
    phoneNumber: "+34 678 123 456",
  });

  const handleGoBack = () => navigate(-1);
  const handleModalToggle = () => setShowModal(!showModal);

  return (
    <div className="profile-root">
      <main className="profile-container">
        {/* === Header === */}
        <header className="profile-header">
          <button className="profile-header__back-button" onClick={handleGoBack} aria-label="Volver atrás">
            <ArrowLeftIcon />
          </button>
          <h2 className="profile-header__title">Mi Perfil</h2>
          <button className="profile-header__logout-button" onClick={onLogout} aria-label="Cerrar sesión">
            <LogoutIcon />
          </button>
        </header>

         <section className="profile-card">
          <div className="profile-card__content">
            <div className="profile-card__avatar" style={{ backgroundImage: `url(${userData.imageUrl})` }}></div>

            <div className="profile-card__info">
              <p className="profile-card__name">
                {userData.name} {userData.firstSurname} {userData.secondSurname}
              </p>
              <p className="profile-card__detail">DNI: {userData.dni}</p>
              <p className="profile-card__detail">{userData.email}</p>
              <p className="profile-card__detail">Tel: {userData.phoneNumber}</p>
            </div>
          </div>

          {/* === Botón editar perfil === */}
          <div className="profile-actions">
            <button type="button" className="profile-actions__button profile-actions__button--primary" onClick={handleModalToggle}>
              Editar perfil
            </button>
          </div>
        </section>

        {/* Modal: Usando el GenericModal */}
        <GenericModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            initialData={userData}
            onSave={(updatedData) => {
                userData(updatedData); 
                setShowModal(false);       
    }}
/>

      </main>
    </div>
  );
};

ProfilePage.defaultProps = {
  onLogout: () => console.log("Logout Clicked"),
};

export default ProfilePage;
