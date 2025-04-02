import React from 'react';
import '../style.css';


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <p>&copy; {currentYear} VeggieVault LLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;