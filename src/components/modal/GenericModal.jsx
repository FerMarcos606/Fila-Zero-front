import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";

const GenericModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal__edit-profile-header">
          <button type="button" className="modal__back-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
            </svg>
          </button>
          <h3>Editar Perfil</h3>
        </div>

        <form onSubmit={handleSubmit} className="modal__edit-profile-form">
          <div className="register__field">
            <label>Avatar</label>
            <input type="file" onChange={handleFileChange} />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="avatar preview" style={{ width: "80px", borderRadius: "50%", marginTop: "0.5rem" }} />
            )}
          </div>
          <div className="register__field">
            <label>Nombre</label>
            <input type="text" name="name" value={formData.name || ""} onChange={handleChange} />
          </div>
          <div className="register__field">
            <label>Primer Apellido</label>
            <input type="text" name="firstSurname" value={formData.firstSurname || ""} onChange={handleChange} />
          </div>
          <div className="register__field">
            <label>Segundo Apellido</label>
            <input type="text" name="secondSurname" value={formData.secondSurname || ""} onChange={handleChange} />
          </div>
          <div className="register__field">
            <label>DNI</label>
            <input type="text" name="dni" value={formData.dni || ""} onChange={handleChange} />
          </div>
          <div className="register__field">
            <label>Email</label>
            <input type="email" name="email" value={formData.email || ""} onChange={handleChange} />
          </div>
          <div className="register__field">
            <label>Teléfono</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} />
          </div>

          <div className="modal__edit-profile-actions" style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <Button text="Cancelar" variant="secondary" onClick={onClose} />
            <Button text="Guardar Cambios" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;