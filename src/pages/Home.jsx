import React from 'react';
import { useState, useEffect } from 'react';
import Card from "../features/Card";
import Logo from "../assets/images/logo.svg";
import { FormControl, InputLabel, Select, TextField, MenuItem, Box } from '@mui/material';
import Button from '@mui/material/Button';

const Home = ({ wishlist, setWishlist }) => {
    
    const API_URL = "https://api.jikan.moe/v4/anime";
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [formData, setFormData] = useState({
        type: '',
        status: '',
        genre: '',
        rating: '',
    });
    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [lastPage, setLastPage] = useState(1);
  
    const fetchData = async (query, pageNum) => {
        const params = new URLSearchParams({
            q: query,
            page: pageNum,
            ...formData
        });    
        console.log(params.toString());
            
        const url = `${API_URL}?${params.toString()}`;
        try {
            const response = await fetch(`${url}`);
            const result = await response.json();
    
            const data = result.data;    
            setData(data);
            const pagination = result.pagination;
            setPage(pagination.current_page);
            setHasNextPage(pagination.has_next_page);
            setLastPage(pagination.last_visible_page);

        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
    };
  
    useEffect(() =>{
        setIsError(false);
        setIsLoading(true);
        fetchData(activeSearch, page);
    },[activeSearch, page]); 

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = () => {
        setPage(1);
        setActiveSearch(search);
        setSearch("");
    };
    
    const renderData = () => {
        if (isLoading) {
            return <p className="loading">Loading...</p>;
        }

        if (isError) {
            return <p className="error">Something went wrong</p>;
        }

        if (data.length === 0) {
            return <p className="empty">No mangas found</p>;
        }

        return (
            <div className="card-container">
                {data.map((item, i) => (
                    <Card key={i} item={item} wishlist={wishlist} setWishlist={setWishlist} />
                ))}
            </div>
        );
    }

    const renderPagination = () => {
        if (isLoading) {
            return;
        }

        if (isError) {
            return;
        }

        if (data.length === 0) {
            return;
        }

        const pages = [];

        const start = Math.max(1, page - 4);
        const end = Math.min(lastPage, page + 4);

        for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                className={`page-number ${
                  page === i ? 'page-current' : ''
                }`}
                onClick={() => setPage(i)}
              >
                {i}
              </button>
            );
        }

        return (
            <div className="pagination">
                {pages}
            </div>
        );

    }

    const renderLoadMore = () => {

        if (page === lastPage) {
            return null;
        }

        return (
            <div className="pagination">
                <button onClick={() => setPage(page + 1)}>
                    Load more
                </button>
            </div>
        );
        
    }

    return (
        <div className="home">
            <h1>Anime</h1>
            <div className="search">
                <input
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search for manga"
                />
                <img
                    src={Logo}
                    alt="search"
                    onClick={() => handleSearchSubmit(search)}
                />
            </div>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    margin: '20px 0',
                    '& .MuiFormControl-root': {
                        minWidth: 200,
                    }

                }}
            >
                <FormControl variant="standard">
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        size="medium"
                        labelId="type-label"
                        id="type"
                        value={activeSearch}
                        label="Type"
                        onChange={(e) => setActiveSearch(e.target.value)}
                    >
                        <MenuItem value="">All Type</MenuItem>
                        <MenuItem value="movie">Movie</MenuItem>
                        <MenuItem value="tv">TV</MenuItem>
                        <MenuItem value="ova">OVA</MenuItem>
                        <MenuItem value="ona">Manga</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        size="medium"
                        labelId="status-label"
                        id="status"
                        value={activeSearch}
                        label="Status"
                        onChange={(e) => setActiveSearch(e.target.value)}
                    >
                        <MenuItem value="">All Status</MenuItem>
                        <MenuItem value="airing">Airing</MenuItem>
                        <MenuItem value="upcoming">Upcoming</MenuItem>
                        <MenuItem value="complete">Complete</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        size="medium"
                        select
                        labelId="genre-label"
                        id="genre"
                        value={activeSearch}
                        label="Genre"
                        onChange={(e) => setActiveSearch(e.target.value)}
                    >
                        <MenuItem value="">All Genres</MenuItem>
                        <MenuItem value="action">Action</MenuItem>
                        <MenuItem value="romance">Romance</MenuItem>
                        <MenuItem value="comedy">Comedy</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel id="rating-label">Rating</InputLabel>
                    <Select
                        size="medium"
                        labelId="rating-label"
                        id="rating"
                        value={activeSearch}
                        label="Rating"
                        onChange={(e) => setActiveSearch(e.target.value)}
                    >
                        <MenuItem value="">All Ratings</MenuItem>
                        <MenuItem value="g">G - All Ages</MenuItem>
                        <MenuItem value="pg">PG - Children</MenuItem>
                        <MenuItem value="pg13">PG-13 - Teens 13 or older</MenuItem>
                        <MenuItem value="r17">R - 17+ (violence & profanity)</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSearchSubmit}
                    >
                        Reset
                    </Button>
                </FormControl>
            </Box>
            <div className="wrapper">
                {renderData()}
                {renderPagination()}
            </div>
        </div>
    );
};

export default Home;