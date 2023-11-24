import React, { useEffect, useState } from "react";
//http://www.omdbapi.com/?i=tt3896198&apikey=d48630d5
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = "http://omdbapi.com?apikey=d48630d5";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('spiderman');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} 
                />
            </div>

            {
                movies?.length > 0 ? 
                (
                    <div className="container">
                        {movies.map(movie => (<MovieCard movie1={movie} />))}
                    </div>
                ) : (
                    <div className="container">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;