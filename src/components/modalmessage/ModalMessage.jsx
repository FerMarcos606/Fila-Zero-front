import React from 'react';
import { Link } from "react-router-dom";
import './ModalMessage.css';

const ModalMessage = ({
  isOpen,
  onClose,
  type = 'success',
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  showSecondaryButton = false
}) => {
  if (!isOpen) return null;

  const getIconConfig = () => {
    const config = {
      success: {
        icon: 'check_circle',
        color: 'modal__icon--green'
      },
      logout: {
        icon: 'logout', 
        color: 'modal__icon--red'
      }
    };
    return config[type] || config.success;
  };

  const iconConfig = getIconConfig();

  return (
    <div className="modal modal--open">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__container">
        <div className="modal__content">
          <div className={`modal__icon ${iconConfig.color}`}>
            <span className="material-symbols-outlined">
              {iconConfig.icon}
            </span>
          </div>

          <h2 className="modal__title">{title}</h2>
          <p className="modal__message">{message}</p>

          <div className="modal__actions">
            {showSecondaryButton && (
              <button 
                className="modal__button modal__button--secondary"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
            
            <Link to="/profile">
              <button 
                className="modal__button modal__button--primary"
                onClick={onPrimaryClick}
              >
                {primaryButtonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;