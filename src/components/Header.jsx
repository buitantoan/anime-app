import React from 'react';
import '../assets/css/Header.css';
import Logo from "../assets/images/logo.svg";

const Header = () => {
    return (
      <header className="header">
        <div class="container">
            <div class="flex-container">
                <a href='/' class="logo">
                    <img src={Logo} alt="logo" />
                </a>
                <nav>
                    <ul className="menu">
                        <li className="menu-item active">
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/wishlist">Wishlist</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
      </header>
    );
};
  
export default Header;