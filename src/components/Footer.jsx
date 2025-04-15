import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Matt. All rights reserved.</p>
    </footer>
  );
};

export default Footer;