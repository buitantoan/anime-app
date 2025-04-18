import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Single = ({ wishlist, setWishlist }) => {
    const API_URL = "https://api.jikan.moe/v4/anime";
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState({});

    const fetchData = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        fetchData(id);
    }, [id]);

    const addToWishlist = (item) => {
        if (wishlist.length === 0) {
            setWishlist([item]);
        }

        if (wishlist.length !== 0 && !wishlist.find((wishItem) => wishItem.mal_id === item.mal_id)) {
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

    function renderData() {
        if (isLoading) {
            return <p className="loading">Loading...</p>;
        }

        if (isError) {
            return <p className="error">Something went wrong</p>;
        }

        if (!data) {
            return <p className="empty">No data found</p>;
        }

        const { mal_id, year, images, title, rating, type } = data;        
        const imageUrl = images.jpg !== undefined ? images.jpg.image_url : "https://via.placeholder.com/400";

        return (
            <div className="single-wrapper" id={mal_id} key={mal_id}>
                <div className="single-image">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="single-title">
                    <h2>{title}</h2>
                </div>
                <div className="single-rating">
                    <p>Rating: {rating}</p>
                </div>
                <div className="single-type">
                    <p>Type: {type}</p>
                </div>
                <div className="single-year">
                    <p>Year: {year}</p>
                </div>
                <div className="single-wishlist">
                    <Fab variant="contained" color={isInWishlist(mal_id) ? 'success' : ''} size="small" aria-label="like">
                        <FavoriteIcon onClick={(e) => handleClick(e, data)} />
                    </Fab>
                </div>
                <div className="single-synopsis">
                    <p>Synopsis: {data.synopsis}</p>
                </div>

            </div>
        );

    }

    return (
        <div className="single">
            <div className="single-container">
                {renderData()}
            </div>
        </div>
    );
}

export default Single;








