import { useState } from 'react';
import './style.css';

const DropdownCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleCard} className="dropdown-button">
        {isOpen ? 'Hide Info' : 'Show Info'}
      </button>

      <div className={`dropdown-card ${isOpen ? 'open' : ''}`}>
        <h3>Card Title</h3>
        <p>This is a dropdown card with some useful content inside.</p>
      </div>
    </div>
  );
};

export default DropdownCard;
