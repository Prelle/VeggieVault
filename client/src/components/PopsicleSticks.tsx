import React from 'react';
import './style.css'; // Make sure this file includes the appropriate styles

interface PopsicleStickButtonProps {
  title: string;
}

const PopsicleStickButton: React.FC<PopsicleStickButtonProps> = ({ title }) => {
  return (
    <button className="homepage-buttons">
      {title}
    </button>
  );
};

export default PopsicleStickButton;
