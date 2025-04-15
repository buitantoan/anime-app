import React from 'react';
import { useState, useEffect } from 'react';
import Card from "../features/Card";
import Logo from "../assets/images/logo.svg";

const Home = () => {
    const API_URL = "https://api.jikan.moe/v4/anime";
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    const [data, setData] = useState([]);
    // const [pagination, setPagination] = useState([]);
  
    const searchManga = async (query) => {
        console.log(query);
        const response = await fetch(`${API_URL}?q=${query}`);
        const result = await response.json();

        const data = result.data;
        // const pagination = result.pagination;

        setData(data);
        // setPagination(pagination);
        setIsLoading(false);
    };
  
    useEffect(() =>{
      setIsLoading(true);
      searchManga(activeSearch);
    },[activeSearch]); 

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = () => {
        setActiveSearch(search);
        setSearch("");
    };

    return (
        <div class="home">
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
                {isLoading ? <p className="loading">Loading...</p> : 
                (data?.length > 0 ? (
                    <div className="card-container">
                    {data.map((item, i) => (            
                        <Card key={i} item={item} />
                    ))}
                    </div>
                    ) : (
                        <div className="empty">
                        <p>No mangas found</p>
                        </div>
                    )
                )}

            </div>
        </div>
    );
};

export default Home;