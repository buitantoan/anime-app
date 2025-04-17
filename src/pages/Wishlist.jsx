import React from 'react';
import Card from "../features/Card";

const Wishlist = ({ wishlist, setWishlist }) => {

    const renderWislist = (wishlist) => {
        
        if (wishlist.length === 0) {
            return <p className="empty">No items in wishlist</p>;
        }

        return wishlist.map((item, i) => (
            <Card key={i} item={item} wishlist={wishlist} setWishlist={setWishlist} />
        ));
    }
    
    return (
        <div className="wishlist">
            <h1>Wishlist</h1>
            <div className="wrapper">
                <div className="card-container">
                    {renderWislist(wishlist)}
                </div>
            </div>
            
        </div>
    );
}
export default Wishlist;