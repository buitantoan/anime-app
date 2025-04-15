import React from 'react';

const Card = ({ item }) => {
  const { mal_id, year, images, title, rating, type } = item;
  const imageUrl = images.jpg.image_url !== "N/A" ? images.jpg.image_url : "https://via.placeholder.com/400";
  return (
    <div id={mal_id} className="card" key={mal_id}>
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