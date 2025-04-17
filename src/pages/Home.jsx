import React from 'react';
import { useState, useEffect } from 'react';
import Card from "../features/Card";
import Logo from "../assets/images/logo.svg";

const Home = ({ wishlist, setWishlist }) => {
    const API_URL = "https://api.jikan.moe/v4/anime";
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [lastPage, setLastPage] = useState(1);
  
    const fetchData = async (query, pageNum) => {
        
        try {
            const response = await fetch(`${API_URL}?q=${query}&page=${pageNum}`);
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
            <div className="wrapper">
                {renderData()}
                {renderPagination()}
            </div>
        </div>
    );
};

export default Home;