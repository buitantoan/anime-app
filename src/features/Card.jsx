import React from 'react';
import { 
  Link 
} from "react-router-dom";
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

const Card = ({ item, wishlist, setWishlist }) => {
  
  const addToWishlist = (item) => {

    if (wishlist.length === 0) {
      setWishlist([item]);
    }

    if ( wishlist.length !== 0 && !wishlist.find((wishItem) => wishItem.mal_id === item.mal_id)) {
      setWishlist([...wishlist, item]);
    }
    
  };

  const removeFromWishlist = (mal_id) => {

    if (wishlist.length === 0) return;

    const updatedWishlist = wishlist.filter((wishItem) => wishItem.mal_id !== mal_id);
    setWishlist(updatedWishlist);
  }
  const isInWishlist = (id) => {

    if (wishlist.length === 0) return false;

    return wishlist.some((item) => item.mal_id === id);
  }
  
  const handleClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(item.mal_id)) {
      removeFromWishlist(item.mal_id);
    } else {
      addToWishlist(item);
    }
  }

  const { mal_id, year, images, title, rating, type } = item || {};
  const imageUrl = images.jpg !== undefined ? images.jpg.image_url : "https://via.placeholder.com/400";

  return (
    <Box id={mal_id} key={mal_id} className="card">
      <Link to={`/anime/${mal_id}`} className="card-link">
        <div className="card-wishlist">
          <Fab variant="contained" color={isInWishlist(mal_id) ? 'success' : ''} size="small" aria-label="like">
            <FavoriteIcon onClick={(e) => handleClick(e, item)} />
          </Fab>
        </div>
        <div className="card-year">
          <p>{year}</p>
        </div>
        <div className="card-image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="card-info">
          <span className="card-type">{type}</span>
          <h3 className="card-title">{title}</h3>
          <p className="card-rating">Rating: {rating}</p>
        </div>
      </Link>
    </Box>
  );
}

export default Card;