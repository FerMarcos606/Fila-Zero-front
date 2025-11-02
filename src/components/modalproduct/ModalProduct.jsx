import React, { useState } from 'react';
import './ProductDetailModal.css'; 

/**
 * Componente ProductDetailModal
 * Modal genérico para configurar y añadir un producto al pedido.
 * Contiene MOCK DATA interna para la demostración.
 * * @param {object} props
 * @param {boolean} props.isOpen - Controla si el modal está visible.
 * @param {function} props.onClose - Cierra el modal.
 * @param {function} props.onAddToOrder - Función que maneja la adición final del ítem.
 * @param {string} props.productId - Usado para seleccionar el mock product (Ej: 'ECA001').
 */
const ProductDetailModal = ({ isOpen, onClose, onAddToOrder }) => {
    
    // --- MOCK DATA INTERNA para la DEMOSTRACIÓN (Simula lo que vendría de tu API) ---
    const MOCK_PRODUCT = {
        id: 'ECA001',
        nombre: "Empanada de Carne",
        precioBase: 3.50,
        // Campo 'descripcion' consolidado con toda la información solicitada
        descripcion: "Una empanada clásica rellena de carne molida sazonada, cebolla y aceitunas. Perfecta para un bocado rápido o una comida satisfactoria. Elaborada con masa hojaldrada, con un peso de 150gr.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkTGQHknU2zpSW46hAqCzeRyTUHuivpP9acX06oTnPQBzFRnpgRyeq94bGO_kfdCh3z0Tx95De_Ij2iaQLpxg1SNQiQtm-lWfT3TVAxM_2kddrSzoxuf1QJ6do0UL-LJTEkVtTDpDzxXGchALHF9YzhIAUIXGS8H5-I0L9pUfhQIkuslYcpP04Vtud4qVGFltb5bSD0GuxdloFAq5_xxKGD2jfZ8Yw1cufMXZGuYjKzlCpnCvWLsVJvCd1Tqa9fKk8L53iEr4wtRDK",
        
        recomendados: [
            { nombre: "Empanada de Pollo", precio: "$2.50", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIOadOOipvHM0bU57tZ3U09hq2zTjPayJh4R4JOgEDAqQRuLoV32LRsyoyUVFk7_ePjADCMZQKpQ7JVO7Gwv9nKCR1nn1hlUygD4Gc7KNkI0TWy2-8-fU0RnXtVdLEpep5Bbd06EfoAYINb19U7EMUKfY60w-_Xf4xNzJW42vnQLS_dVCOCjqWXVtRg8xFbJxVCDYQbSgsYvNPGDpD1FX8isUcRlRQ7Wa1wwwQQ4EeJ8A3ZlLo1FaQOJUCZz_swzuyB-pVB9zvmC5A" },
            { nombre: "Empanada de Jamón y Queso", precio: "$2.00", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhUo8HzZJDjCBzRzEb48bUfb7XQDupBASYp_6QNrIVLXFwOzVKMnZLFZzQ7bG6796e038uMaH8MBKly2bvih-INxIzS74DnV476vTRIx0jhlg7uR4BEgPEmHH8M94aEXpuJN79QVWh41jP1XO2UbhDMUm0q4Y0V2CxgZnb_6xA1Eui_iZka3mG1P9oTblUSA1IHpF_fxkPg1a7SJJyJEfzwskrT0WYWFJIadsJ0pRECAqkts2mln2ny7QeZ15rVfZUl_BSyqw3DLvK" },
            { nombre: "Empanada de Verduras", precio: "$1.75", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFFWr_Co1BJEkhEWp3hFMDo4Kab4r42UuwMQcEV9hnF79j-CyfPeB2E_XkJdJYrEidBAObbSUd4o-WI2L-GS7n67-qQO86s12Hiak14J_OawpN1jYSpJ4xxOifzSRZOyiTFuto2iSkCRNdkSmaYS6m_Kqcev6WjWPf9ty6ewrcj94rdIQBJ94TubF-bVDhMTIlUwos86uKIzZeCZ5vJ5fB3zvHBYkjveg1cHgOvE08vSLbN4hjFWDD5UxodsispNO7O0ry1XCQpI8Q" },
        ]
    };
    
    // NOTA: Para la demo, el modal siempre usará el mock de la empanada de carne.
    const producto = MOCK_PRODUCT; 

    // --- Lógica del Estado Local (Cantidad y Notas) ---
    const [cantidad, setCantidad] = useState(1);
    const [notas, setNotas] = useState('');

    const aumentarCantidad = () => setCantidad(prev => prev + 1);
    const disminuirCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));
    
    const precioTotal = (producto.precioBase * cantidad).toFixed(2);

    const handleAddToOrder = () => {
        const itemToOrder = {
            productId: producto.id,
            productName: producto.nombre,
            quantity: cantidad,
            unitPrice: producto.precioBase,
            totalPrice: parseFloat(precioTotal),
            notes: notas.trim()
        };
        // Llama a la prop para manejar el pedido y luego cierra el modal
        onAddToOrder(itemToOrder); 
        onClose(); 
    };
    
    const handleBackOrClose = () => {
        // Resetear estados al cerrar para la próxima apertura
        setCantidad(1);
        setNotas('');
        onClose();
    };

    // Si el modal no está abierto, no renderizamos nada
    if (!isOpen) {
        return null;
    }

    // --- Renderizado del Modal ---
    return (
        <div className="ProductDetailModal__overlay" onClick={handleBackOrClose}>
            <div className="ProductDetailModal__container" onClick={(e) => e.stopPropagation()}>
                
                <main className="DetalleProducto__main">
                    
                    {/* Header y Botón de Cierre */}
                    <header className="DetalleProducto__header">
                        <button className="DetalleProducto__header-backButton" onClick={handleBackOrClose}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <h1 className="DetalleProducto__header-title">Detalles</h1>
                        <div className="DetalleProducto__header-placeholder"></div>
                    </header>

                    {/* Imagen del Producto */}
                    <div className="DetalleProducto__imageContainer">
                        <img alt={producto.nombre} className="DetalleProducto__image" src={producto.imageUrl} />
                    </div>

                    {/* Información Principal (Nombre, Precio) */}
                    <section className="DetalleProducto__infoSection DetalleProducto__infoSection--main">
                        <div className="DetalleProducto__mainInfo">
                            <h2 className="DetalleProducto__name">{producto.nombre}</h2>
                            <p className="DetalleProducto__price">${producto.precioBase.toFixed(2)}</p>
                        </div>
                        {/* Se muestra una descripción corta aquí */}
                        <p className="DetalleProducto__description">{producto.descripcion.split('.')[0] + '.'}</p>
                    </section>
                    
                    {/* SECCIÓN: Información Consolidada de la descripción */}
                    <section className="DetalleProducto__infoSection">
                        <h3 className="DetalleProducto__sectionTitle">Detalles y Composición</h3>
                        <p className="DetalleProducto__consolidatedText">
                           {producto.descripcion} 
                        </p>
                    </section>
                    
                    {/* SECCIÓN: Interacción de Pedido (Cantidad y Notas) */}
                    <section className="DetalleProducto__infoSection DetalleProducto__infoSection--interaction">
                        <h3 className="DetalleProducto__sectionTitle">Tu Pedido</h3>
                        
                        {/* Selector de Cantidad */}
                        <div className="DetalleProducto__quantitySelector">
                            <button 
                                className="DetalleProducto__quantityButton" 
                                onClick={disminuirCantidad} 
                                disabled={cantidad <= 1}
                            >
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <span className="DetalleProducto__quantityValue">{cantidad}</span>
                            <button 
                                className="DetalleProducto__quantityButton" 
                                onClick={aumentarCantidad}
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>

                        {/* Notas Especiales */}
                        <h3 className="DetalleProducto__sectionTitle DetalleProducto__sectionTitle--mt">Instrucciones Especiales</h3>
                        <textarea
                            className="DetalleProducto__notesTextarea"
                            placeholder="Ej: Sin cebolla, bien tostada..."
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                            rows="3"
                        ></textarea>
                    </section>
                
                    {/* 7. Recomendados */}
                    <section className="DetalleProducto__recommendedSection">
                        <h3 className="DetalleProducto__sectionTitle DetalleProducto__sectionTitle--padded">Recomendados</h3>
                        <div className="DetalleProducto__recommendedList">
                            {producto.recomendados.map((item, index) => (
                                <div className="DetalleProducto__recommendedItem" key={index}>
                                    <img alt={item.nombre} className="DetalleProducto__recommendedImage" src={item.imageUrl} />
                                    <p className="DetalleProducto__recommendedName">{item.nombre}</p>
                                    <p className="DetalleProducto__recommendedPrice">{item.precio}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </main>

                {/* Contenedor Fijo para el Botón de Acción */}
                <div className="DetalleProducto__actionFixedContainer">
                    <button className="DetalleProducto__addToOrderButton" onClick={handleAddToOrder}>
                        Añadir {cantidad} artículo(s) por ${precioTotal}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;