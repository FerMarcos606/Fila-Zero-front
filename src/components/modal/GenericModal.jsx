import React  from 'react';
import Button from "../../components/button/Button"; 
// NOTA: 'GenericModal' o 'BottomSheetModal' sería un componente genérico que 
// maneja el overlay, las animaciones y el 'onClose'. Lo usaremos aquí implícitamente.

const GenericModal = ({ isOpen, onClose, initialData }) => {
    
    // El formulario de edición necesita su propio estado (ProfileEditForm ya tiene su lógica)
    // Para simplicidad, aquí solo manejamos el UI del modal.

    // B: Bloque principal del modal (usando la clase que adaptamos: .modal__edit-profile)
    return (
        <div className={`modal modal--bottom-sheet ${isOpen ? 'modal--show' : ''}`}>
            <div className="modal__edit-profile">
                
                {/* E: Encabezado del modal (edit-profile-modal-header -> modal__edit-profile-header) */}
                <div className="modal__edit-profile-header">
                    <h3 className="modal__edit-profile-title">Editar Perfil</h3>
                    <button 
                        type="button" 
                        className="modal__edit-profile-close-button" 
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                {/* E: Formulario de edición (edit-profile-form -> modal__edit-profile-form) */}
                <form className="modal__edit-profile-form">
                    
                    {/* NOTA: Aquí irían los campos del ProfileEditForm.jsx */}
                    {/* Reutilizando la estructura .register__field que ya hicimos */}

                    <div className="register__field">
                        <label htmlFor="edit-nombre" className="register__label">Nombre</label>
                        <input type="text" id="edit-nombre" name="nombre" defaultValue={initialData.name} className="register__input" />
                    </div>
                    {/* ... otros campos: Apellidos, DNI, Teléfono ... */}

                    {/* E: Acciones (edit-profile-actions -> modal__edit-profile-actions) */}
                    <div className="modal__edit-profile-actions">
                        <Button text="Cancelar" variant="secondary" onClick={onClose} />
                        <Button text="Guardar Cambios" variant="primary" type="submit" />
                    </div>
                </form>
            </div>
            {/* Opcional: El overlay en sí para cerrar al clickear fuera */}
            <div className="modal__overlay" onClick={onClose}></div> 
        </div>
    );
};

export default GenericModal;