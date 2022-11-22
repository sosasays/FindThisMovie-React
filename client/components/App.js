import React, { useState, useEffect } from "react";
import Card from "./Card"
import { v4 as uuidv4 } from 'uuid';

function App(props) {

    const API_KEY = '875ebf3e8605e8636054eb7af4e751ef';
    const [APIData, setAPIData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Fetch data given the provided search query.
    useEffect(() => {
    const search = async () => {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);
        const showsResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);

        const movieData = await movieResponse.json();
        const validMovieData = movieData.results.filter((movie) => movie.id && movie['poster_path']);
        
        const showData = await showsResponse.json();
        const validShowData = showData.results.filter((movie) => movie.id && movie['poster_path']);

        setAPIData([...validMovieData, ...validShowData]);
    }
    // Ensure the search query is valid with atleast 3 characters.
    if(searchQuery.length > 3) search();

    }, [searchQuery])
    
    // Render the individual cards of movie data.
    const renderMovies = APIData.map((result) => {
        return (
            <Card key={uuidv4()} id={result.id} posterPath={`https://image.tmdb.org/t/p/w500${result.poster_path}`} movieDetails={result} />
        );
    });

    return (
      <div>
        <h1>Find where you can binge watch your next show.</h1>
        <input type="text" placeholder="Movie or TV Show" onChange={(e) => {setSearchQuery(e.target.value)}}/>
        {renderMovies}
      </div>
    );
};

export default App;