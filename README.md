# Fila-Zero - Frontend

**Fila-Zero** es la aplicación web frontend de gestión de **filas virtuales** y **recogida de pedidos** en comercios, diseñada para optimizar la experiencia del usuario y reducir tiempos de espera.  

La aplicación es **responsiva**, funcionando tanto en **dispositivos móviles** como en **desktop**, y está desarrollada en **React** con Tailwind CSS.

---

## 📌 Tecnologías principales

- **React 18**: Biblioteca principal para UI.  
- **React Router DOM**: Manejo de rutas.  
- **CSS**: Diseño responsivo y moderno.  
- **Axios**: Comunicación con backend.  
- **ESLint & Prettier**: Código limpio y consistente.  

---

## 🗂 Estructura resumida del proyecto

src/
├─ assets/ # Imágenes, iconos y recursos
├─ components/ # Botones, Cards, Formularios reutilizables
├─ pages/ # HomePage, Dashboard, Turnos, Tu Pedido, LoginPage, Profile
├─ services/ # API calls
├─ hooks/ # Custom hooks
├─ context/ # Estado global con Context API
├─ routes/ # Configuración de rutas
├─ styles/ # CSS global y específicos
└─ App.jsx
└─ index.jsx




<img width="250" height="750" alt="screen" src="https://github.com/user-attachments/assets/6cdce6f1-eb6f-41aa-91a6-e162fd9ee868" />
<img width="263" height="750" alt="screen" src="https://github.com/user-attachments/assets/5cb9d8fa-ebab-443f-a406-55ceaf10f07f" />

<img width="250" height="750" alt="screen" src="https://github.com/user-attachments/assets/4be7cbc7-cfaf-4026-859f-59ff0b01e7a7" /> 
<img width="250" height="750" alt="screen" src="https://github.com/user-attachments/assets/825234e1-be5f-4b33-8f52-07d9b6049fbb" />




---

## 🎯 Funcionalidades principales

### 1. Gestión de filas virtuales
- Visualización de posición en tiempo real.  
- Notificaciones sobre cambios en la fila o turno asignado.  

### 2. Recogida de pedidos
- Confirmación de pedidos listos para retirar.  
- Detalle de productos y cantidades.  

### 3. Diseño responsivo
- Compatible con **mobile** y **desktop**.  
- Interfaz clara y accesible.  

### 4. Autenticación y roles
- Integración con backend Fila-Zero (actualmente Basic Auth).  
- Diferentes vistas según tipo de usuario.  

### 5. Notificaciones
- Alertas sobre cambios en la fila o estado del pedido.

---

## 🎨 Flujo de pantallas (Mockups)

  A[Login / Registro] --> B[Home / Dashboard]
   B --> C[Ver Turno / Posición en Fila]
    B --> D[Pedidos / Detalles de Pedido]
    C --> E[Notificaciones]
    D --> E

    git clone https://github.com/FerMarcos606/Fila-Zero-front.git
cd Fila-Zero-front

👨‍💻 Autor

Fernando Marcos Proyecto académico / personal — 2025
