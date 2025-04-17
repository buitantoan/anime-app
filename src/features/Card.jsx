import React from 'react';

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
  
  const handleClick = (item) => {
    if (isInWishlist(item.mal_id)) {
      removeFromWishlist(item.mal_id);
    } else {
      addToWishlist(item);
    }
  }

  const { mal_id, year, images, title, rating, type } = item;
  const imageUrl = images.jpg.image_url !== "N/A" ? images.jpg.image_url : "https://via.placeholder.com/400";

  return (
    <div id={mal_id} className="card" key={mal_id}>
      <div className="card-wishlist">
        <button onClick={() => handleClick(item)}>
          {!isInWishlist(mal_id) ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.04 0 3.99.81 5.5 2.09C14.51 3.81 16.46 3 18.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path></svg>
          }
        </button>
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
    </div>
  );
}

export default Card;