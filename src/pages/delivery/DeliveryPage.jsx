import React, { useState, useEffect } from 'react';
import "./DeliveryPage.css"; 


/**
 * Componente principal que representa la página de Delivery/Detalles de Pedido,
 * incluyendo la lógica de temporizador y cambio de estado automático.
 */
const DeliveryPage = () => {
  // 1. ESTADOS DINÁMICOS
  const [status, setStatus] = useState("En preparación");
  const [statusColor, setStatusColor] = useState("amber"); 
  const [timeRemaining, setTimeRemaining] = useState("Cargando...");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. DATOS DEL PEDIDO (simulando una API response)
  const orderData = {
    id: '12345',
    items: [
      { name: 'Empanada de carne', quantity: 2, price: 5.00 },
      { name: 'Empanada de pollo', quantity: 1, price: 2.50 },
      { name: 'Empanada de jamón y queso', quantity: 1, price: 2.50 },
      { name: 'Empanada de humita', quantity: 1, price: 2.50 },
    ],
    total: 12.50,
    estimatedPickup: "2025-10-30T18:00:00", // Hora de ejemplo
    queueNumber: 3,
  };

  // 3. LÓGICA DEL TEMPORIZADOR Y CAMBIO DE ESTADO
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const pickupTime = new Date(orderData.estimatedPickup);
      let diffMs = pickupTime - now;

      if (diffMs <= 0) {
        setStatus("Listo para retirar");
        setStatusColor("green");
        setTimeRemaining("00:00");
        return; 
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      setTimeRemaining(`${minutes}:${seconds}`);
      
      if (status === "Cargando..." || status === "En preparación") {
         setStatus("En preparación");
         setStatusColor("amber");
      }
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [orderData.estimatedPickup, status]); 


  // --- Handlers de Navegación y Modal ---
  const handleBack = () => {
    console.log('Navegar hacia atrás (Implementar lógica de React Router o history.back)');
    // Aquí deberías usar useNavigate() de react-router-dom
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="page-delivery"> 
      <Header
        title="Detalles del pedido"
        subtitle="Tu Pedido"
        leftIcon={<span className="material-symbols-outlined">arrow_back</span>}
        rightIcon={<span className="material-symbols-outlined">info</span>}
        onLeftClick={handleBack}
        onRightClick={openModal}
      />

      <main className="page-delivery__main">
        <h2 className="page-delivery__title">Pedido #{orderData.id}</h2>
        
        <div className="page-delivery__grid">
          <OrderSummary summary={orderData.items} total={orderData.total} />
          
          <div className="status-queue-group">
            <StatusCard status={status} statusColor={statusColor} />
            <TimeRemainingCard time={timeRemaining} /> 
          </div>

          <EstimatedPickupCard estimatedPickup={orderData.estimatedPickup} />
        </div>
      </main>
      
      <Footer />
      <StatusModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

// --- COMPONENTES REUSABLES DEFINIDOS EN ESTE ARCHIVO ---

/**
 * Header adaptado a los props que usaste en el return.
 */
const Header = ({ title, subtitle, leftIcon, rightIcon, onLeftClick, onRightClick }) => (
  <header className="header">
    <div className="header__content">
      <button className="header__button header__button--back" onClick={onLeftClick}>
        {leftIcon}
      </button>
      <div className="header__text-group">
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">{subtitle}</p>
      </div>
      <button className="header__button header__button--info" onClick={onRightClick}>
        {rightIcon}
      </button>
    </div>
  </header>
);

const OrderSummary = ({ summary, total }) => (
  <div className="summary-card">
    <h3 className="summary-card__title">Resumen del pedido</h3>
    <div className="summary-card__list">
      {summary.map((item, index) => (
        <div className="summary-card__item" key={index}>
          <p className="summary-card__item-name">{item.name} (x{item.quantity})</p>
          <p className="summary-card__item-price">${item.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
    <hr className="summary-card__divider" />
    <div className="summary-card__total">
      <p className="summary-card__total-label">Total</p>
      <p className="summary-card__total-amount">${total.toFixed(2)}</p>
    </div>
  </div>
);

const StatusCard = ({ status, statusColor }) => {
    const colorClass = `text-${statusColor}`; 
    return (
        <div className="info-card info-card--status">
            <p className="info-card__label">Estado</p>
            <p className={`info-card__value info-card__value--primary ${colorClass}`}>{status}</p>
        </div>
    );
};

const TimeRemainingCard = ({ time }) => (
  <div className="info-card info-card--queue">
    <p className="info-card__label">Faltan aprox.</p>
    <p className="info-card__value info-card__value--large">{time}</p>
  </div>
);

const EstimatedPickupCard = ({ estimatedPickup }) => {
    const formatTime = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs';
    };

    return (
        <div className="pickup-card pickup-card--estimated">
            <p className="pickup-card__label">Hora de Retiro Estimada</p>
            <p className="pickup-card__value pickup-card__value--primary">{formatTime(estimatedPickup)}</p>
        </div>
    );
};


const Footer = () => (
  <footer className="footer">
    <nav className="footer__nav">
      <NavItem icon="home" label="Inicio" isActive={false} href="#" />
      <NavItem icon="receipt_long" label="Pedidos" isActive={true} href="#" />
      <NavItem icon="notifications" label="Notificaciones" isActive={false} href="#" />
      <NavItem icon="person" label="Perfil" isActive={false} href="#" />
    </nav>
  </footer>
);

const NavItem = ({ icon, label, isActive, href }) => (
  <a className={`nav-item ${isActive ? 'nav-item--active' : ''}`} href={href}>
    <span className="material-symbols-outlined nav-item__icon">{icon}</span>
    <span className="nav-item__label">{label}</span>
  </a>
);

// --- Componentes Modales ---

const StatusModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'modal--is-open' : ''}`} onClick={(e) => {
        if (e.target.classList.contains('modal')) {
            onClose();
        }
    }}>
      <div className="modal__content">
        <div className="modal__header">
          <h3 className="modal__title">Estados del Pedido</h3>
          <button className="modal__close-button" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="modal__body">
          <StatusItem 
            color="bg-amber-500" 
            title="En preparación" 
            description="Tu pedido se está cocinando." 
          />
          <StatusItem 
            color="bg-green-500" 
            title="Listo para retirar" 
            description="¡Tu pedido está listo! Acércate a retirarlo." 
          />
          <StatusItem 
            color="bg-red-500" 
            title="Cancelado" 
            description="Tu pedido ha sido cancelado." 
          />
        </div>
      </div>
    </div>
  );
};


const StatusItem = ({ color, title, description }) => (
  <div className="status-item">

    <span className={`status-item__indicator ${color}`}></span>
    <div className="status-item__text-group">
      <p className="status-item__title">{title}</p>
      <p className="status-item__description">{description}</p>
    </div>
  </div>
);

export default DeliveryPage;