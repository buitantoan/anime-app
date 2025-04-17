import React from 'react';
import { 
    Link 
} from "react-router-dom";

import '../assets/css/Header.css';
import Logo from "../assets/images/logo.svg";

const Header = () => {
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
            </div>
        </div>
      </header>
    );
};
  
export default Header;