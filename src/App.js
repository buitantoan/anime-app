import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Routes, 
  Route,
} from "react-router-dom";
import './assets/css/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';

const App = () => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  , [wishlist]);

  return (
    <div className="app">
      <Header />
        <main>
          <Routes>
              <Route path="/" element={<Home wishlist={wishlist} setWishlist={setWishlist} />} />
              <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
          </Routes>
        </main>
      <Footer />
    </div>
  );
}

export default App;