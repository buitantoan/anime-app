import React from 'react';
import { useState, useEffect } from 'react';
import './assets/css/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RenderRouter from './routes/RenderRouter';

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
          <RenderRouter wishlist={wishlist} setWishlist={setWishlist} />
        </main>
      <Footer />
    </div>
  );
}

export default App;