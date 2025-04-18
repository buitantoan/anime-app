import React from 'react';
import { useState, useEffect } from "react";
import { 
    Link 
} from "react-router-dom";
import '../assets/css/Header.css';
import Logo from "../assets/images/logo.svg";

import Button from '@mui/material/Button';


const Header = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    };
    
    return (
      <header className="header">
        <div className="container">
            <div className="flex-container">
                <a href='/' className="logo">
                    <img src={Logo} alt="logo" />
                </a>
                <nav>
                    <ul className="menu">
                        <li className="menu-item active">
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/wishlist">Wishlist</Link>
                        </li>
                    </ul>
                </nav>
                <div className="dark-mode">
                    <Button variant="contained" color="primary" className="dark-mode-button" onClick={toggleTheme}>
                        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                    </Button>
                </div>
            </div>
        </div>
      </header>
    );
};
  
export default Header;