import React, { useState } from 'react';
import './DropdownMenu.css';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Opciones
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/option1" className="dropdown-item">Perfil</a>
          <a href="/option2" className="dropdown-item">Opcion 2</a>
          <a href="/option3" className="dropdown-item">Opción 3</a>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
