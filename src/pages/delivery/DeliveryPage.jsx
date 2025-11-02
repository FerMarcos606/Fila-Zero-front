import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'; 
import './DeliveryPage.css'; 

const DeliveryPage = () => {
  const { onRequestInfoModal } = useOutletContext() || {};
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenLogoutModal = () => console.log('Logout modal opened');

  const [statusPedido, setStatusPedido] = useState('preparacion');
  const TIEMPO_INICIAL_SEGUNDOS = 900; 
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_INICIAL_SEGUNDOS);
  const [mostrarCola, setMostrarCola] = useState(false);

  useEffect(() => {
    if (onRequestInfoModal) {
      onRequestInfoModal(handleOpenModal);
    }
  }, [onRequestInfoModal]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num) => num.toString().padStart(2, '0');
    return hours > 0
      ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      : `${pad(minutes)}:${pad(seconds)}`;
  };

  useEffect(() => {
    if (tiempoRestante <= 0) return;
    const intervalId = setInterval(() => setTiempoRestante(prev => prev - 1), 1000);
    return () => clearInterval(intervalId);
  }, [tiempoRestante]);

  useEffect(() => {
    const timerEstado = setTimeout(() => setStatusPedido('listo'), 6000);
    return () => clearTimeout(timerEstado);
  }, []); 

  useEffect(() => {
    setMostrarCola(statusPedido === 'listo');
  }, [statusPedido]);

  const obtenerEstadoTexto = () => {
    switch (statusPedido) {
      case 'preparacion': return 'En Preparación';
      case 'listo': return 'Listo para Retirar';
      case 'retirado': return 'Retirado';
      default: return 'Cargando...';
    }
  };

  return (
    <div className="delivery-page">
      <Header
        title="Las empanadas en SU PUNTO"
        leftIcon={<span className="material-symbols-outlined">arrow_back</span>}
        rightIcon={<span className="material-symbols-outlined">info</span>}
        onLeftClick={() => navigate('/home')}
        onRightClick={handleOpenModal}
        onLogoutClick={handleOpenLogoutModal}
      />
     
      <main className="delivery-main">
        <div className="delivery-main__section-title">
          <h2 className="delivery-main__order-id">Tu Pedido</h2>
        </div>

        <div className="delivery-main__container">
          <div className="summary-card">
            <h3 className="summary-card__title">Resumen del pedido</h3>
            <div className="summary-card__item-list">
              <div className="summary-card__item"><p>Empanada de carne (x2)</p><p className="summary-card__price">$5.00</p></div>
              <div className="summary-card__item"><p>Empanada de pollo (x1)</p><p className="summary-card__price">$2.50</p></div>
              <div className="summary-card__item"><p>Empanada de jamón y queso (x1)</p><p className="summary-card__price">$2.50</p></div>
              <div className="summary-card__item"><p>Empanada de humita (x1)</p><p className="summary-card__price">$2.50</p></div>
            </div>
            <hr className="summary-card__divider" />
            <div className="summary-card__total"><p>Total</p><p>$12.50</p></div>
            <p className="summary-card__thanks">¡Gracias Por su Compra!</p>
          </div>

          <div className="grid-status">
            <div className="status-box">
              <p className="status-box__label">Estado</p>
              <p className="status-box__value status-box__value--primary">{obtenerEstadoTexto()}</p>
            </div>
            <div className="status-box">
              <p className="status-box__label">Tu Turno</p>
              <p className="status-box__value">#3</p>
            </div>
          </div>

          <div className="eta-box">
            <p className="eta-box__label">Retiro Estimado</p>
            <p className="eta-box__value">15 de julio, 18:00 hs</p>
          </div>
          
          <div className="time-left-box">
            <p className="time-left-box__label">Faltan aprox.</p>
            <p className="time-left-box__value">
              {tiempoRestante > 0 ? formatTime(tiempoRestante) : '¡Listo!'}
            </p>
            {mostrarCola && (
              <p className="time-left-box__queue-info">
                Tu lugar en la cola es: <span className="time-left-box__queue-number">#05</span>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <div className={`modal ${isModalOpen ? 'is-open' : ''}`} onClick={handleCloseModal}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="modal__title">Estados del Pedido</h3>
            <button className="modal__close-btn" onClick={handleCloseModal}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="modal__body">
            <div className="modal__status-item">
              <span className="modal__status-dot modal__status-dot--amber"></span>
              <div><p className="modal__status-title">En preparación</p><p className="modal__status-desc">Tu pedido se está cocinando.</p></div>
            </div>
            <div className="modal__status-item">
              <span className="modal__status-dot modal__status-dot--green"></span>
              <div><p className="modal__status-title">Listo para retirar</p><p className="modal__status-desc">¡Tu pedido está listo! Acércate a retirarlo.</p></div>
            </div>
            <div className="modal__status-item">
              <span className="modal__status-dot modal__status-dot--red"></span>
              <div><p className="modal__status-title">Cancelado</p><p className="modal__status-desc">Tu pedido ha sido cancelado.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
