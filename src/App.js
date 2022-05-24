import {useEffect,useState} from "react";
import MovieCard from "./MovieCard";

import './App.css'
import SearchIcon from './Search.svg'

const API_URL = 'https://www.omdbapi.com/?apikey=7f3a5af8'

const movie1 = {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
};

const App = () => {
    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Avengers');
    },[]);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ):
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )

            }
            

        </div>
    );
}

export default App;