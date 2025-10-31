import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button"; 
import "./RegistrationPage.css";

const RegisterPage = () => {
    // 1. Hook de navegación
    // const navigate = useNavigate();

    // 2. Hook para manejar todos los datos del formulario (Customer y Profile)
    const [formData, setFormData] = useState({
        // CustomerEntity:
        username: '', // Necesitarás añadir este campo al formulario más tarde si es obligatorio
        email: '',
        password: '',
        confirmPassword: '', // Campo de validación solo en frontend
        
        // ProfileEntity:
        name: '',
        firstSurname: '',
        secondSurname: '',
        dni: '',
        phoneNumber: '',
    });

    // 3. Hook para manejar errores de validación (opcional pero recomendado)
    const [errors, setErrors] = useState({});

    // 4. Manejador de cambios para actualizar el estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Limpiar el error cuando el usuario comienza a escribir
        if (errors[name]) {
             setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    // 5. Lógica de validación simple
    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Validación de Contraseñas
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
            isValid = false;
        }

        // Se pueden añadir más validaciones (campos vacíos, formato de email, DNI, etc.)

        setErrors(newErrors);
        return isValid;
    };

    // 6. Manejador de envío de formulario (aquí iría la llamada a tu API)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // CORRECCIÓN: Renombramos 'confirmPassword' a '_confirmPassword' para indicarle 
            // al linter que es intencionalmente no utilizada (descartada antes de enviar).
            const { confirmPassword: _confirmPassword, ...dataToSubmit } = formData;
            
            // Aquí iría la llamada a tu API REST de Fila-Zero
            console.log("Datos listos para enviar al backend:", dataToSubmit);
            
            // Usamos 'navigate' para ir a la página de login después de un registro exitoso.
            // Esto resuelve la advertencia 'navigate is never used'.
            // navigate("/login");
            
        } else {
            console.log("Formulario tiene errores de validación.");
        }
    };

    return (
        // B: Bloque principal
        <div className="register">
            <h1 className="register__title">Registro de Usuario</h1>
            
            <form className="register__form" onSubmit={handleSubmit}>

                {/* E: Elemento - La cuadrícula para los datos de Profile */}
                <div className="register__grid">
                    
                    {/* NOMBRE (ProfileEntity) */}
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
                            required
                        />
                    </div>
                    
                    {/* PRIMER APELLIDO (ProfileEntity) */}
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
                            required
                        />
                    </div>
                    
                    {/* SEGUNDO APELLIDO (ProfileEntity) */}
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
                            required
                        />
                    </div>
                    
                    {/* DNI (ProfileEntity) */}
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
                            required
                        />
                    </div>
                    
                    {/* TELÉFONO (ProfileEntity) */}
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
                            required
                        />
                    </div>
                </div> 
                
                {/* EMAIL (CustomerEntity) - Campo en columna simple */}
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
                        required
                    />
                </div>
                
                {/* CONTRASEÑA (CustomerEntity) */}
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
                        required
                    />
                </div>
                
                {/* CONFIRMAR CONTRASEÑA (Validación Frontend) */}
                <div className="register__field">
                    <label htmlFor="confirmPassword" className="register__label">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="••••••••"
                        className={`register__input ${errors.confirmPassword ? 'register__input--error' : ''}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className="register__error-message">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* E: Elemento - Contenedor del botón */}
                <div className="register__button-container">
                    <button type="submit" className="button button--primary">Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;