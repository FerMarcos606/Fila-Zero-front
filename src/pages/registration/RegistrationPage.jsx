import React, { useState } from 'react';
import ModalMessage from '../../components/modalmessage/ModalMessage';
import "./RegistrationPage.css";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    firstSurname: '',
    secondSurname: '',
    dni: '',
    phoneNumber: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleGoToProfile = () => {
    // Guardar datos en localStorage
    const userDataToSave = {
      name: formData.name,
      firstSurname: formData.firstSurname,
      secondSurname: formData.secondSurname,
      dni: formData.dni,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHfP-xaT45kIoCmxtNUrjRNRpbpk0Y8cvvuf55jxySXQT0b46ORG5MA4H7tAq9fMYXiWnWzLbsxBRwQboBCRGe2RGart0jAjmxr_oVJKOmly7B7uYZ1HVlmSfAy9co-kMcadpjQcFUHck86qPSZQVXDHwiJy8Ir3jRkxxxUibTQXiUn611HQTa7eMBqceBkEtzgiiiYtwF2cbpTvjvTjDr0qbr9Vo5tYwZq2mmvy-ne9Ey9qeuLalWdluUY-EjLhH5oGHuP4BMODLQ"
    };
    
    localStorage.setItem('userData', JSON.stringify(userDataToSave));
    console.log("💾 Datos guardados:", userDataToSave);
    
    navigate("/profile");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="register">
      <h1 className="register__title">Registro de Usuario</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="register__grid">
          <div className="register__field">
            <label htmlFor="name" className="register__label">Nombre</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              placeholder="Tu nombre"
              className="register__input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="register__field">
            <label htmlFor="firstSurname" className="register__label">Primer Apellido</label>
            <input 
              type="text" 
              id="firstSurname" 
              name="firstSurname"
              placeholder="Tu primer apellido"
              className="register__input"
              value={formData.firstSurname}
              onChange={handleChange}
            />
          </div>
          
          <div className="register__field">
            <label htmlFor="secondSurname" className="register__label">Segundo Apellido</label>
            <input 
              type="text" 
              id="secondSurname" 
              name="secondSurname"
              placeholder="Tu segundo apellido"
              className="register__input"
              value={formData.secondSurname}
              onChange={handleChange}
            />
          </div>
          
          <div className="register__field">
            <label htmlFor="dni" className="register__label">DNI</label>
            <input 
              type="text" 
              id="dni" 
              name="dni"
              placeholder="Tu DNI"
              className="register__input"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>
          
          <div className="register__field">
            <label htmlFor="phoneNumber" className="register__label">Teléfono</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber"
              placeholder="+34 123 456 789"
              className="register__input"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div> 
        
        <div className="register__field">
          <label htmlFor="email" className="register__label">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="tu@email.com"
            className="register__input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="register__field">
          <label htmlFor="password" className="register__label">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="••••••••"
            className="register__input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="register__field">
          <label htmlFor="confirmPassword" className="register__label">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            placeholder="••••••••"
            className="register__input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="register__button-container">
          <button type="submit" className="button button--primary">Registrarse</button>
        </div>
      </form>

      <ModalMessage
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="¡Registro exitoso!"
        message="Tu cuenta ha sido creada correctamente."
        primaryButtonText="Ir a mi perfil"
        onPrimaryClick={handleGoToProfile}
      />
    </div>
  );
};

export default RegistrationPage;