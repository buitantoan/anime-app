import React from 'react';
import { 
  Routes, 
  Route,
} from "react-router-dom";
import Home from '../pages/Home';
import Wishlist from '../pages/Wishlist';
import Single from '../pages/Single';

const RenderRouter = (item) => {
    
    return (
        <Routes>
            <Route path="/" element={<Home wishlist={item.wishlist} setWishlist={item.setWishlist} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={item.wishlist} setWishlist={item.setWishlist} />} />
            <Route path="/anime/:id" element={<Single wishlist={item.wishlist} setWishlist={item.setWishlist} />} />
        </Routes>
    );
}
export default RenderRouter;