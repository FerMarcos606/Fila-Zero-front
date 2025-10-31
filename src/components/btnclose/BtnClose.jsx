import React from 'react';

import './BtnClose.css'; 

/**
 *X red
 * @param {object} props 
 * @param {function} props.onClick 
 * @param {string} [props.ariaLabel='Cerrar'] 
 */
const BtnClose = ({ onClick, ariaLabel = 'Cerrar' }) => {
  return (
    
    <button 
      className="close-button" 
      onClick={onClick}
    
      aria-label={ariaLabel} 
    >
      {/* no content es necesary,no svg, ::before y ::after en tu CSS.
      */}
    </button>
  );
};

export default BtnClose;