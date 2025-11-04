import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'; 
import './DeliveryPage.css'; 

// Datos fijos de empanadas para mostrar nombre y precio
const EMPANADAS_DATA = [
  { key: "carne", name: "Carne", price: 2.50 },
  { key: "pollo", name: "Pollo", price: 2.50 },
  { key: "vegetariana", name: "Vegetariana", price: 2.75 },
  { key: "cecina", name: "Cecina y Queso Cabra", price: 3.00 },
];

const DeliveryPage = () => {
  const { onRequestInfoModal } = useOutletContext() || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // const handleOpenLogoutModal = () => console.log('Logout modal opened');

  // ✅ Recuperar datos del pedido desde HomePage
  const { order = {}, totalPrice = "0.00" } = location.state || {};

  const [statusPedido, setStatusPedido] = useState('preparacion');
  
  // ⏱️ CAMBIO AQUÍ: ahora arranca en 1 minuto (60s)
  const TIEMPO_INICIAL_SEGUNDOS = 60; 
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_INICIAL_SEGUNDOS);

  // 🔁 CAMBIO AQUÍ: control del mensaje de cola
  const [mensajeCola, setMensajeCola] = useState("Tu lugar en la cola es: #05");
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

  // 🕒 CAMBIO AQUÍ: cronómetro descendente y reinicio automático
  useEffect(() => {
    if (tiempoRestante <= 0) return;

    const intervalId = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          // Cuando llega a 0:
          setMensajeCola("Se ha superado tu tiempo de recogida del pedido. Tu nueva posición en la cola es: #17");
          // Reinicia con una nueva cuenta atrás de 30 min (1800s)
          setTiempoRestante(1800); // 30 minutos fijos
          return 0; // corta el ciclo actual
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tiempoRestante]);

  // Transición de estado de pedido (8s)
  useEffect(() => {
    const timerEstado = setTimeout(() => setStatusPedido('listo'), 8000);
    return () => clearTimeout(timerEstado);
  }, []); 

  // Mostrar cola cuando está listo
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
            title="Tu Pedido"
            leftIcon={<span className="material-symbols-outlined">arrow_back</span>}
            rightIcon={<span className="material-symbols-outlined">info</span>}
            secondRightIcon={<span className="material-symbols-outlined">logout</span>}
            onLeftClick={() => navigate('/home')}
            onRightClick={handleOpenModal}
            onSecondRightClick={null} // usa el logout por defecto
        />
     
      <main className="delivery-main">
        <div className="delivery-main__section-title">
          <h2 className="delivery-main__order-id">Resumen del pedido</h2>
        </div>

        <div className="delivery-main__container">
          {/* ✅ Lista dinámica de pedido */}
          <div className="summary-card">
            <div className="summary-card__item-list">
              {EMPANADAS_DATA.map((item) => {
                const qty = order[item.key] || 0;
                if (qty === 0) return null; // mostrar solo >0
                return (
                  <div key={item.key} className="summary-card__item">
                    <p>{item.name} (x{qty})</p>
                    <p className="summary-card__price">
                      €{(item.price * qty).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <hr className="summary-card__divider" />

            <div className="summary-card__total">
              <p>Total</p>
              <p>€{parseFloat(totalPrice).toFixed(2)}</p>
            </div>
            <p className="summary-card__thanks">¡Gracias por su compra!</p>
          </div>

          {/* Estado y turno */}
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
                {/* CAMBIO AQUÍ: mensaje dinámico */}
                {mensajeCola}
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de info existente, no tocamos */}
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
              <div>
                <p className="modal__status-title">En preparación</p>
                <p className="modal__status-desc">Tu pedido se está cocinando.</p>
              </div>
            </div>
            <div className="modal__status-item">
              <span className="modal__status-dot modal__status-dot--green"></span>
              <div>
                <p className="modal__status-title">Listo para retirar</p>
                <p className="modal__status-desc">¡Tu pedido está listo! Acércate a retirarlo.</p>
              </div>
            </div>
            <div className="modal__status-item">
              <span className="modal__status-dot modal__status-dot--red"></span>
              <div>
                <p className="modal__status-title">Cancelado</p>
                <p className="modal__status-desc">Tu pedido ha sido cancelado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
