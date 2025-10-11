import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

import { ReactComponent as HomeIcon } from '../../assets/icon/home.svg';
import { ReactComponent as UserIcon } from '../../assets/icon/account_box.svg';
import { ReactComponent as OrderIcon } from '../../assets/icon/order.svg';
import { ReactComponent as BellIcon } from '../../assets/icon/notifications.svg';


export default function Footer() {
  return (
    <nav className="mobile-nav-bar">
      <NavLink to="/home" className="nav-item">
        <HomeIcon className="nav-item-icon" />
        <span>Inicio</span>
      </NavLink>

      <NavLink to="/pedidos" className="nav-item">
        <OrderIcon className="nav-item-icon" />
        <span>Pedidos</span>
        <div className="nav-item-badge">3</div> {/* ejemplo de notificación */}
      </NavLink>

      <NavLink to="/notificaciones" className="nav-item">
        <BellIcon className="nav-item-icon" />
        <span>Alertas</span>
      </NavLink>

      <NavLink to="/perfil" className="nav-item">
        <UserIcon className="nav-item-icon" />
        <span>Perfil</span>
      </NavLink>
    </nav>
  );
}