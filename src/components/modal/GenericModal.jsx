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
// ¡Estilos inline sólo para presentación!
  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          width: '90%',
          maxWidth: '500px',
          position: 'relative',
          boxSizing: 'border-box',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__edit-profile-header" style={{ marginBottom: '1.5rem' }}>
          <button 
            type="button" 
            className="modal__back-button" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
            </svg>
          </button>
          <h3 style={{ display: 'inline-block', marginLeft: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Editar Perfil</h3>
        </div>

        <form onSubmit={handleSubmit} className="modal__edit-profile-form">
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Avatar</label>
            <input type="file" onChange={handleFileChange} style={{ width: '100%' }} />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="avatar preview" style={{ width: "80px", borderRadius: "50%", marginTop: "0.5rem" }} />
            )}
          </div>
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nombre</label>
            <input type="text" name="name" value={formData.name || ""} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Primer Apellido</label>
            <input type="text" name="firstSurname" value={formData.firstSurname || ""} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Segundo Apellido</label>
            <input type="text" name="secondSurname" value={formData.secondSurname || ""} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>DNI</label>
            <input type="text" name="dni" value={formData.dni || ""} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
            <input type="email" name="email" value={formData.email || ""} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>
          <div className="register__field" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Teléfono</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>

          <div className="modal__edit-profile-actions" style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem", gap: '1rem' }}>
            <Button text="Cancelar" variant="secondary" onClick={onClose} />
            <Button text="Guardar Cambios" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;